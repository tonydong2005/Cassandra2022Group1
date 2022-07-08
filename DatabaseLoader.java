/*
 * Copyright 2015 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.greglturnquist.payroll;

import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.cql.ResultSet;
import com.datastax.oss.driver.api.core.cql.Row;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

/**
 * @author Greg Turnquist
 */
// tag::code[]
@Component
public class DatabaseLoader implements CommandLineRunner {

	private final EmployeeRepository repository;


	@Autowired
	public DatabaseLoader(EmployeeRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception {
		CassandraConnector connector = new CassandraConnector();
		connector.connect("127.0.0.1", 9042, "datacenter1");
		CqlSession session = connector.getSession();
		KeyspaceRepository keyspaceRepository = new KeyspaceRepository(session);
		//String query="CREATE KEYSPACE test WITH replication = {'class':'SimpleStrategy', 'replication_factor':1};";
		//String query="DROP KEYSPACE \"test\";";
		String query1 = "USE testkeyspace;";
		//String query2 = "SELECT * FROM emp;";
		String query3 = "SELECT * FROM emp;";
		session.execute(query1);
		//session.execute(query2);
		ResultSet result = session.execute(query3);
		String[] str = new String[10];
		//str = result.one().getFormattedContents();
		List<Row> list = result.all();
		for (int i = 0; i < list.size(); i++) {
			str[i] = list.get(i).getFormattedContents();
		}
		this.repository.save(new Employee(str[0], str[1], str[2]));
		
	}
}
// end::code[]