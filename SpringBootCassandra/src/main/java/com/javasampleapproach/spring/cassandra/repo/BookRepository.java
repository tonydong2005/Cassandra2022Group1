package com.javasampleapproach.spring.cassandra.repo;

import java.util.UUID;

import org.springframework.data.cassandra.repository.CassandraRepository;

import com.javasampleapproach.spring.cassandra.model.Book;

public interface BookRepository extends CassandraRepository<Book, UUID> {

}
