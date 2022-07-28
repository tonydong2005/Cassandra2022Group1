package com.javasampleapproach.spring.cassandra;

import com.datastax.driver.core.schemabuilder.CreateKeyspace;
import com.datastax.driver.core.schemabuilder.SchemaBuilder;
import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.cql.SimpleStatement;
import java.util.*;

/*
CreationMethods (Create keyspace, table, and data)
Created by Tommy Fang 7/3/2022
Big thanks to Athulya and Vikas!
 */

public class CreateMethods {

    private CqlSession session;

    //constructor
    public CreateMethods(CqlSession session){
        this.session=session;
    }

    public void createKeyspace(String keyspace){
        session.execute("CREATE KEYSPACE " + keyspace + " WITH replication = {'class':'SimpleStrategy', 'replication_factor':1};");
    }

    public void createTable(String keyspace, String table, ArrayList<String>labels, String partitions, String clustering){
        String use="USE "+keyspace+";";
        session.execute(use);
        StringBuilder query=new StringBuilder("CREATE TABLE "+ table+"(");
        for(int i=0;i<labels.size();i++){
            query.append(labels.get(i) +", ");
        }
        if(clustering.equals("skip")) query.append("PRIMARY KEY(("+partitions+")));");
        else query.append("PRIMARY KEY(("+partitions+"),"+ clustering+"));");
        session.execute(String.valueOf(query));
    }

    public void createData(String keyspace, String tableName, List<String>labels, List<String>rows) {
        String use="USE "+keyspace+";";
        session.execute(use);
        StringBuilder query = new StringBuilder("INSERT INTO " + tableName + " (");
        for(int i=0;i<labels.size()-1;i++){
            query.append(labels.get(i) +", ");
        }
        query.append(labels.get(labels.size()-1) + ")");
        for (String values : rows) {
            StringBuilder q = new StringBuilder(query + " VALUES(" + values + ");");
            System.out.println(q);
            session.execute(String.valueOf(q));
        }
    }


}
