import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.cql.ResultSet;
import com.datastax.oss.driver.api.core.cql.SimpleStatement;
import java.util.*;

import com.datastax.oss.driver.api.querybuilder.QueryBuilder;
import com.datastax.oss.driver.api.querybuilder.SchemaBuilder;
import com.datastax.oss.driver.api.querybuilder.schema.CreateKeyspace;
import com.datastax.oss.driver.api.querybuilder.select.Select;

/*
CreationMethods (Create keyspace, table, and data)
Created by Tommy, Athulya, Vikas 7/3/2022
 */

public class GenerateKeySpace {

    private CqlSession session;

    //constructor
    public GenerateKeySpace(CqlSession session){
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