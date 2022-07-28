package com.javasampleapproach.spring.cassandra.controller;

import java.util.ArrayList;
import java.util.List;

import com.javasampleapproach.spring.cassandra.CassandraConnector;
import com.javasampleapproach.spring.cassandra.CreateMethods;
import com.javasampleapproach.spring.cassandra.KeyspaceRepository;
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

	@GetMapping("keyspaces/{keyspaceName}/tables")
	public List<String> getAllTables(@PathVariable(value = "keyspaceName") String keyspace) {
		System.out.print("getAllTables ran in keyspace ");
		System.out.println(keyspace);
		System.out.println(keyspaceRepository.getTableList(keyspace));
		return keyspaceRepository.getTableList(keyspace);
	}

	@GetMapping("keyspaces/{keyspaceName}/tables/{tableName}/rows")
	public List<List<String>> getAllRows(@PathVariable("keyspaceName") String keyspace, @PathVariable("tableName") String table) {
		System.out.print("getAllRows ran in keyspace ");
		System.out.print(keyspace + " in table ");
		System.out.println(table);
		List<List<String>> list = keyspaceRepository.getRowList(keyspace, table);
		System.out.println(list);
		return list;
	}

	@GetMapping("keyspaces/{keyspaceName}/tables/{tableName}/columnNames")
	public List<String> getColumnNames(@PathVariable("keyspaceName") String keyspace, @PathVariable("tableName") String table) {
		System.out.println("getColumnNames ran in keyspace " + keyspace + " in table " + table);
		List<String> list = keyspaceRepository.getColNames(keyspace, table);
		List<String> list2 = keyspaceRepository.getPrimaryKeyNames(keyspace, table);
		list.removeAll(list2);
		list.addAll(0, list2);
		System.out.println(list);
		return list;
	}

//	@PostMapping("/{keyspaceName}/{tableName}/addRow")
//	public void createRow(@PathVariable("keyspaceName") String keyspace, @PathVariable("tableName") String table, @Valid @RequestBody String str) {
//		int index = 1;
//		String word = "";
//		List<String> list = new ArrayList<>();
//		while (index < str.length()) {
//			if (str.charAt(index) == '\"') {
//				index++;
//				while(str.charAt(index) != '\"') {
//					index++;
//				}
//				index+=3;
//				while(str.charAt(index) != '\"') {
//					word += str.charAt(index);
//					index++;
//				}
//				list.add(word);
//			}
//			index++;
//			word = "";
//		}
//		System.out.println("createRow ran in keyspace " + keyspace + " in table " + table);
//		System.out.println(list);
//		List<String> lis1 = keyspaceRepository.getColNames(keyspace, table);
//		List<String> lis2 = keyspaceRepository.getPrimaryKeyNames(keyspace, table);
//		lis1.removeAll(lis2);
//		lis1.addAll(0, lis2);
//		createMethods.createData(keyspace, table, lis1, list);
//	}
	@PutMapping("/keyspaces/{keyspaceName}/tables/{tableName}/addRow")
	public boolean addRow(@PathVariable("keyspaceName") String keyspace, @PathVariable("tableName") String table, @Valid @RequestBody RowRequest added)
	{
		try{
			System.out.print("addRow ran in keyspace ");
			System.out.print(keyspace + " in table ");
			System.out.println(table + " with the following coldefs and row");
			System.out.println(added.getCols() + " " + added.getRows());
			CreateMethods cM = new CreateMethods(session);
			cM.createData(keyspace, table, added.getCols(), added.getRows());
			return true;
		}
		catch (Exception e)
		{
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

	public List<String> getRows() {
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