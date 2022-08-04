/**************************************************************************
 * GenerateKeyspace.java codes for the Java methods that create entities in
 * the Cassandra database. Refer to any additional comments for details
 * about the code.
 *
 * Written by Tony Dong, Athulya Saravanakumar, Sophia Phu,
 * Rishindra Davuluri, Tommy Fang, Suhani Goswami,
 * Nitya Pakala, and Tejas Kalpathi.
 *
 * Big thanks to Vikas Thoutam for technical support.
 *
 * Last updated: 8/3/2022
 *************************************************************************/

package spring.repo;

import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.cql.SimpleStatement;
import java.util.*;

import com.datastax.oss.driver.api.querybuilder.SchemaBuilder;
import com.datastax.oss.driver.api.querybuilder.schema.CreateKeyspace;


public class GenerateKeyspace {

    private CqlSession session;

    //constructor
    public GenerateKeyspace(CqlSession session){
        this.session=session;
    }

    public void createKeyspace(String keyspace){
        CreateKeyspace createKeyspace = SchemaBuilder.createKeyspace(keyspace).ifNotExists()
                .withSimpleStrategy(1);
        SimpleStatement create = createKeyspace.build();
        session.execute(create);
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

    public void createData(String keyspace, String tableName, ArrayList<String>labels, ArrayList<String>rows) {
        String use="USE "+keyspace+";";
        session.execute(use);
        StringBuilder query = new StringBuilder("INSERT INTO " + tableName + " (");
        for(int i=0;i<labels.size()-1;i++){
            query.append(labels.get(i) +", ");
        }
        query.append(labels.get(labels.size()-1) + ")");
        for (String values : rows) {
            StringBuilder q = new StringBuilder(query + " VALUES(" + values + ");");
            session.execute(String.valueOf(q));
        }
    }
}