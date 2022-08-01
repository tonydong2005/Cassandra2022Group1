package com.javasampleapproach.spring.cassandra.controller;

import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.javasampleapproach.spring.cassandra.CassandraConnector;
import com.javasampleapproach.spring.cassandra.CreateMethods;
import com.javasampleapproach.spring.cassandra.KeyspaceRepository;
import com.javasampleapproach.spring.cassandra.ModifierMethods;
import org.springframework.http.ResponseEntity;
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
	private KeyspaceRepository keyspaceRepository;
	private CreateMethods createMethods;

	private ModifierMethods modifierMethods;

	public CassandraController() {
		CassandraConnector connector = new CassandraConnector();
		connector.connect("127.0.0.1", 9042, "datacenter1");
		session = connector.getSession();
		System.out.println("ran constructor");
		keyspaceRepository = new KeyspaceRepository(session);
		createMethods = new CreateMethods(session);
	}

	/*@GetMapping("/books")
	public List<Book> getAllBooks() {
		System.out.println("Get all Books...");

		return bookRepository.findAll();
	}*/
	@GetMapping("/keyspaces")
	public List<String> getAllKeyspaces() {
		System.out.println("getAllKeyspaces ran");
		return keyspaceRepository.getKeyspaceList();

	}

	@GetMapping("/keyspaces/{keyspaceName}/tables")
	public List<String> getAllTables(@PathVariable(value = "keyspaceName") String keyspace) {
		System.out.print("getAllTables ran in keyspace ");
		System.out.println(keyspace);
		System.out.println(keyspaceRepository.getTableList(keyspace));
		return keyspaceRepository.getTableList(keyspace);
	}

	@GetMapping("/keyspaces/{keyspaceName}/tables/{tableName}/rows")
	public List<List<String>> getAllRows(@PathVariable("keyspaceName") String keyspace, @PathVariable("tableName") String table) {
		System.out.print("getAllRows ran in keyspace ");
		System.out.print(keyspace + " in table ");
		System.out.println(table);
		List<List<String>> list = keyspaceRepository.getRowList(keyspace, table);
		System.out.println(list);
		return list;
	}

	@GetMapping("/keyspaces/{keyspaceName}/tables/{tableName}/columnNames")
	public List<String> getColumnNames(@PathVariable("keyspaceName") String keyspace, @PathVariable("tableName") String table) {
		System.out.println("getColumnNames ran in keyspace " + keyspace + " in table " + table);
		List<String> list = keyspaceRepository.getColNames(keyspace, table);
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
			modifierMethods = new ModifierMethods(session);
			keyspaceRepository = new KeyspaceRepository(session);
			List<String> primaryKeyNames = keyspaceRepository.getPrimaryKeyNames(keyspace, table);
			Map<String, Object> map1 = new LinkedHashMap<>();
			Map<String, Object> map2 = new LinkedHashMap<>();
			for (int i = 0; i < edited.getCols().size(); i++) {
				for (String s : primaryKeyNames) {
					if (edited.getCols().get(i) == s) {
						map1.put(edited.getCols().get(i), edited.getRow().get(i));
					}
					else {
						map2.put(edited.getCols().get(i), edited.getRow().get(i));
					}
				}
			}
			modifierMethods.editRow(keyspace, table, map1, map2);
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
			modifierMethods = new ModifierMethods(session);
			keyspaceRepository = new KeyspaceRepository(session);
			List<String> primaryKeyNames = keyspaceRepository.getPrimaryKeyNames(keyspace, table);
			Map<String, Object> map = new LinkedHashMap<>();
			for (String s : primaryKeyNames) {
				for (int i = 0; i < deleted.getCols().size(); i++) {
					if (deleted.getCols().get(i).equals(s)) {
						map.put(deleted.getCols().get(i), deleted.getRow().get(i));
						System.out.println(map);
					}
				}
			}
			modifierMethods.deleteRow(keyspace, table, map);
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