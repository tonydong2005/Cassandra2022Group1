import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.metadata.schema.ColumnMetadata;
import java.io.IOException;
import java.sql.Array;
import java.util.*;

/*
CreationMethods (Run this to create keyspace, table, and data without cqlsh) :O
Created by Tommy Fang 7/3/2022       :)

Notes for createKeyspace method:
    Error will appear if you create a keyspace that already exists

Notes for createTable method:
    Must have PRIMARY KEY after a data type for at least one of the labels (preferably the first which should be an id label)
    Must type 'end' once there are no more labels to be added

Notes for createData method:
    Don't put '.' in the table labels or this method may not work
    Any other character is allowed (including space and special characters)
    Make sure there are no duplicate labels or this method may not work
    You need to enter a value. Default for null is '' and 0 for string and int respectively
    Make sure you enter a different value for each row for labels with PRIMARY KEY
 */

public class CreationMethods {
    private CqlSession session;

    //constructor
    public CreationMethods(CqlSession session){
        this.session=session;
    }

    public void createKeyspace(String ks){
        String query="CREATE KEYSPACE "+ks+" WITH replication = {'class':'SimpleStrategy', 'replication_factor':1};";
        session.execute(query);
    }

    public void createTable(String name, Map<String,String>labels){
        String query="CREATE TABLE "+ name+"(";
        for(Map.Entry<String, String> label : labels.entrySet()){
            query=query+label.getKey()+" "+label.getValue()+", ";
        }
        query=query+");";
        session.execute(query);
    }

    public void createData(ArrayList<String>tableLabels,ArrayList<String>rows,String tableName) {
        String query = "INSERT INTO " + tableName + " (";
        int iter = 0;
        while (iter != tableLabels.size() - 1) {
            query = query + tableLabels.get(iter) + ", ";
            iter++;
        }
        query = query + tableLabels.get(iter) + ")";

        for (String values : rows) {
            String q = query + " VALUES(" + values + ");";
            session.execute(q);
        }
    }
}


