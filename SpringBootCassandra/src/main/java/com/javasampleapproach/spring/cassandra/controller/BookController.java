package com.javasampleapproach.spring.cassandra.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.validation.Valid;

import com.datastax.oss.driver.api.core.cql.Row;
import com.javasampleapproach.spring.cassandra.CassandraConnector;
import com.javasampleapproach.spring.cassandra.CreateMethods;
import com.javasampleapproach.spring.cassandra.KeyspaceRepository;
import com.javasampleapproach.spring.cassandra.model.Tabl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.AccessType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.datastax.driver.core.utils.UUIDs;

import com.datastax.oss.driver.api.core.CqlSession;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class BookController {
	//@Autowired
	//BookRepository bookRepository;
	private CqlSession session;

	public BookController() {
		CassandraConnector connector = new CassandraConnector();
		connector.connect("127.0.0.1", 9042, "datacenter1");
		session = connector.getSession();
		System.out.println("ran constructor");
	}

	/*@GetMapping("/books")
	public List<Book> getAllBooks() {
		System.out.println("Get all Books...");

		return bookRepository.findAll();
	}*/
	@GetMapping("/keyspaces")
	public List<String> getAllKeyspaces() {

		KeyspaceRepository keyspaceRepository = new KeyspaceRepository(session);
		System.out.println("getAllKeyspaces ran");
		return keyspaceRepository.getKeyspaceList();

	}

	@GetMapping("keyspaces/{keyspaceName}/tables")
	public List<String> getAllTables(@PathVariable(value = "keyspaceName") String keyspace) {
		KeyspaceRepository keyspaceRepository = new KeyspaceRepository(session);
		System.out.print("getAllTables ran in keyspace ");
		System.out.println(keyspace);
		System.out.println(keyspaceRepository.getTableList(keyspace));
		return keyspaceRepository.getTableList(keyspace);
	}

	@GetMapping("keyspaces/{keyspaceName}/tables/{tableName}")
	public List<List<String>> getAllRows(@PathVariable("keyspaceName") String keyspace, @PathVariable("tableName") String table) {
		KeyspaceRepository keyspaceRepository = new KeyspaceRepository(session);
		System.out.print("getAllRows ran in keyspace ");
		System.out.print(keyspace + " in table ");
		System.out.println(table);
		List<List<String>> list = keyspaceRepository.getRowList(keyspace, table);
		System.out.println(list);
		return list;
	}

	@GetMapping("keyspaces/{keyspaceName}/tables/{tableName}/columnNames")
	public List<String> getColumnNames(@PathVariable("keyspaceName") String keyspace, @PathVariable("tableName") String table) {
		KeyspaceRepository keyspaceRepository = new KeyspaceRepository(session);
		System.out.print("getColumnNames ran in keyspace ");
		System.out.print(keyspace + " in table ");
		System.out.println(table);
		List<String> list = keyspaceRepository.getColNames(keyspace, table);
		System.out.println(list);
		return list;
	}
/*
	@PostMapping("/books/create")
	public ResponseEntity<Book> createBook(@Valid @RequestBody Book book) {
		System.out.println("Create Book: " + book.getTitle() + "...");

		book.setId(UUIDs.timeBased());
		Book _book = bookRepository.save(book);
		return new ResponseEntity<>(_book, HttpStatus.OK);
	}
	public ResponseEntity<Book> createKeyspace() {
		CassandraConnector connector = new CassandraConnector();
		connector.connect("127.0.0.1", 9042, "datacenter1");
		CqlSession session = connector.getSession();
		CreateMethods create = new CreateMethods(session);
		create.createKeyspace("test");
		return new ResponseEntity<>(book, HttpStatus.OK);
	}*/

	/*@PutMapping("/books/{id}")
	public ResponseEntity<Book> updateBook(@PathVariable("id") UUID id, @RequestBody Book book) {
		System.out.println("Update Book with ID = " + id + "...");

		Optional<Book> bookData = bookRepository.findById(id);
		if (bookData.isPresent()) {
			Book savedBook = bookData.get();
			savedBook.setTitle(book.getTitle());
			savedBook.setAuthor(book.getAuthor());
			savedBook.setDescription(book.getDescription());
			savedBook.setPublished(book.getPublished());

			Book updatedBook = bookRepository.save(savedBook);
			return new ResponseEntity<>(updatedBook, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/books/{id}")
	public ResponseEntity<String> deleteBook(@PathVariable("id") UUID id) {
		System.out.println("Delete Book with ID = " + id + "...");

		try {
			bookRepository.deleteById(id);
		} catch (Exception e) {
			return new ResponseEntity<>("Fail to delete!", HttpStatus.EXPECTATION_FAILED);
		}

		return new ResponseEntity<>("Book has been deleted!", HttpStatus.OK);
	}
	*/
}
