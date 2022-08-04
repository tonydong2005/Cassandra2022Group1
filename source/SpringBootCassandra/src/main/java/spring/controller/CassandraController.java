/**************************************************************************
 * CassandraController.java codes for the rest controller that response to
 * and calls Java methods based on the mappings received from axios. Refer
 * to any additional comments for details about the code.
 *
 * Written by Tony Dong, Athulya Saravanakumar, Sophia Phu,
 * Rishindra Davuluri, Tommy Fang, Suhani Goswami,
 * Nitya Pakala, and Tejas Kalpathi.
 *
 * Big thanks to Vikas Thoutam for technical support.
 *
 * Last updated: 8/3/2022
 *************************************************************************/

package spring.controller;

import java.util.*;

import spring.CassandraConnector;
import spring.repo.CreateMethods;
import spring.repo.AccessKeyspace;
import spring.repo.GenerateKeyspace;
import spring.repo.ModifyKeyspace;
import org.springframework.web.bind.annotation.*;

import com.datastax.oss.driver.api.core.CqlSession;

import javax.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class CassandraController {
	//@Autowired
	//BookRepository bookRepository;
	private CqlSession session;
	private AccessKeyspace accessKeyspace;
	private GenerateKeyspace generateKeyspace;
	private ModifyKeyspace modifyKeyspace;

	public CassandraController() {
		CassandraConnector connector = new CassandraConnector();
		connector.connect("127.0.0.1", 9042, "datacenter1");
		session = connector.getSession();
		System.out.println("ran constructor");
		accessKeyspace = new AccessKeyspace(session);
		generateKeyspace = new GenerateKeyspace(session);
		modifyKeyspace = new ModifyKeyspace(session);
	}

	@GetMapping("/cluster")
	public List<String> getClusterInfo() {
		System.out.println("getClusterInfo ran");
		List<String> clusterInfo = new ArrayList<>();
		clusterInfo.add(accessKeyspace.clusterName());
		clusterInfo.add(accessKeyspace.getClusterSize());
		return clusterInfo;
	}
	@GetMapping("/keyspaces")
	public List<String> getAllKeyspaces() {
		System.out.println("getAllKeyspaces ran");
		return accessKeyspace.getKeyspaceList();
	}

	@GetMapping("/keyspaces/{keyspaceName}/tables")
	public List<Map<String, Object>> getAllTables(@PathVariable(value = "keyspaceName") String keyspace) {
		System.out.print("getAllTables ran in keyspace ");
		System.out.println(keyspace);
		List<Map<String, Object>> list = new ArrayList<>();
		Map<String, Object> map;
		for (String table : accessKeyspace.getTableList(keyspace)) {
			map = new LinkedHashMap<>();
			map.put("table", table);
			map.put("metrics", getMetrics(keyspace, table));
			list.add(map);
		}
		System.out.println(list);
		return list;
	}

	@GetMapping("/keyspaces/{keyspaceName}/tables/{tableName}/rows")
	public List<List<String>> getAllRows(@PathVariable("keyspaceName") String keyspace, @PathVariable("tableName") String table) {
		System.out.print("getAllRows ran in keyspace ");
		System.out.print(keyspace + " in table ");
		System.out.println(table);
		List<List<String>> list =accessKeyspace.getRowList(keyspace, table);
		System.out.println(list);
		return list;
	}

	@GetMapping("/keyspaces/{keyspaceName}/tables/{tableName}/metrics")
	public List<String> getMetrics(@PathVariable("keyspaceName") String keyspace, @PathVariable("tableName") String table) {
		System.out.print("getMetrics ran in keyspace ");
		System.out.print(keyspace + " in table ");
		System.out.println(table);
		List<String> list = new ArrayList<>();
		list.add(accessKeyspace.getTableSizes().get(keyspace + " " + table));
		list.add(accessKeyspace.getColDefs(keyspace, table).size() + "");
		list.add(accessKeyspace.getRowList(keyspace, table).size() + "");
		list.add(accessKeyspace.statsPart(accessKeyspace.getRowsPerPartition(keyspace, table), list.get(0)));
		System.out.println(list);
		return list;
	}

	@GetMapping("/keyspaces/{keyspaceName}/tables/{tableName}/columnNames")
	public List<String> getColumnNames(@PathVariable("keyspaceName") String keyspace, @PathVariable("tableName") String table) {
		System.out.println("getColumnNames ran in keyspace " + keyspace + " in table " + table);
		List<String> list =accessKeyspace.getColNames(keyspace, table);
		System.out.println(list);
		return list;
	}
	@PutMapping("/keyspaces/{keyspaceName}/tables/{tableName}/addRow")
	public boolean addRow(@PathVariable("keyspaceName") String keyspace, @PathVariable("tableName") String table, @Valid @RequestBody RowRequest added)
	{
		try{
			System.out.print("addRow ran in keyspace ");
			System.out.print(keyspace + " in table ");
			System.out.println(table + " with the following coldefs and row");
			System.out.println(added.getCols() + " " + added.getRow());
			CreateMethods cM = new CreateMethods(session);
			List<String> list = added.getRow();
			String val = "";
			for (String s : list) {
				val += s + ", ";
			}
			val = val.substring(0, val.length() - 2);
			list.clear();
			list.add(val);
			cM.createData(keyspace, table, added.getCols(), list);
			return true;
		}
		catch (Exception e) {
			return false;
		}
	}

	@PutMapping("/keyspaces/{keyspaceName}/tables/{tableName}/editRow")
	public boolean editRow(@PathVariable("keyspaceName") String keyspace, @PathVariable("tableName") String table, @Valid @RequestBody RowRequest edited)
	{
		try{
			System.out.print("editRow ran in keyspace ");
			System.out.print(keyspace + " in table ");
			System.out.println(table + " with the following coldefs and row");
			System.out.println(edited.getCols() + " " + edited.getRow());
			List<String> primaryKeyNames =accessKeyspace.getPrimaryKeyNames(keyspace, table);
			Map<String, Object> map1 = new LinkedHashMap<>();
			Map<String, Object> map2 = new LinkedHashMap<>();

			for (int i = 0; i < edited.getCols().size(); i++) {
				for (String s : primaryKeyNames) {
					if (edited.getCols().get(i).equals(s)) {
						map1.put(edited.getCols().get(i), edited.getRow().get(i));
					}
					else {
						map2.put(edited.getCols().get(i), edited.getRow().get(i));
					}
				}
			}
			modifyKeyspace.editRow(keyspace, table, map1, map2, 0);
			return true;
		}
		catch (Exception e) {
			return false;
		}
	}

	@PutMapping("/keyspaces/{keyspaceName}/tables/{tableName}/deleteRow")
	public boolean deleteRow(@PathVariable("keyspaceName") String keyspace, @PathVariable("tableName") String table, @Valid @RequestBody RowRequest deleted)
	{
		try{
			System.out.print("deleteRow ran in keyspace ");
			System.out.print(keyspace + " in table ");
			System.out.println(table + " with the following coldefs and row");
			System.out.println(deleted.getCols() + " " + deleted.getRow());
			List<String> primaryKeyNames =accessKeyspace.getPrimaryKeyNames(keyspace, table);
			Map<String, Object> map = new LinkedHashMap<>();
			for (String s : primaryKeyNames) {
				for (int i = 0; i < deleted.getCols().size(); i++) {
					if (deleted.getCols().get(i).equals(s)) {
						map.put(deleted.getCols().get(i), deleted.getRow().get(i));
						System.out.println(map);
					}
				}
			}
			modifyKeyspace.deleteRow(keyspace, table, map);
			return true;
		}
		catch (Exception e) {
			return false;
		}
	}

}

class RowRequest{
	private List<String> cols, row;
	public RowRequest(List<String> cols, List<String> row)
	{
		this.cols = cols;
		this.row = row;
	}

	public List<String> getCols() {
		return cols;
	}

	public List<String> getRow() {
		return row;
	}

	@Override
	public String toString() {
		return "RowRequest{" +
				"cols=" + cols +
				", rows=" + row +
				'}';
	}
}