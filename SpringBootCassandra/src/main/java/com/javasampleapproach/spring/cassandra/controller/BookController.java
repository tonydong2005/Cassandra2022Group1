package com.javasampleapproach.spring.cassandra.controller;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.javasampleapproach.spring.cassandra.model.Book;
import com.javasampleapproach.spring.cassandra.repo.BookRepository;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class BookController {

	@Autowired
	BookRepository bookRepository;

	@GetMapping("/books")
	public List<Book> getAllBooks() {
		System.out.println("Get all Books...");

		return bookRepository.findAll();
	}

	@PostMapping("/books/create")
	public ResponseEntity<Book> createBook(@Valid @RequestBody Book book) {
		System.out.println("Create Book: " + book.getTitle() + "...");

		book.setId(UUIDs.timeBased());
		Book _book = bookRepository.save(book);
		return new ResponseEntity<>(_book, HttpStatus.OK);
	}

	@PutMapping("/books/{id}")
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
		System.out.println("Delete Baook with ID = " + id + "...");

		try {
			bookRepository.deleteById(id);
		} catch (Exception e) {
			return new ResponseEntity<>("Fail to delete!", HttpStatus.EXPECTATION_FAILED);
		}

		return new ResponseEntity<>("Book has been deleted!", HttpStatus.OK);
	}
}