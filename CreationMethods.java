import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.metadata.schema.ColumnMetadata;

import java.io.IOException;
import java.sql.Array;
import java.util.*;

/*
CreationMethods (Run this to create keyspace, table, and data without cqlsh) :O
Created by Tommy Fang 7/3/2022       :)

General notes:
All test codes are separated an commented. The comments are there because YOU get to choose which to create. If you want to create all three, uncomment all three. If only a table, uncomment the create table test.
Tests are in the order: keyspace, table, data
All methods currently successfully work as checked by the creator
All red error lines appear to not affect the program's function. However, check if the keyspace, table, etc. are properly created
Exit code 0 means success

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
    private static CqlSession session;
    private static Map<String,String> tableLabels = new HashMap<String,String>();

    public static void createKeyspace(String ks){
        String query="CREATE KEYSPACE "+ks+" WITH replication = {'class':'SimpleStrategy', 'replication_factor':1};";
        session.execute(query);
    }

    public static void createTable(String name, Map<String,String>labels){
        String query="CREATE TABLE "+ name+"(";
        for(Map.Entry<String, String> label : tableLabels.entrySet()){
            query=query+label.getKey()+" "+label.getValue()+", ";
        }
        query=query+");";
        session.execute(query);
    }

    public static void createData(ArrayList<String>tableLabels,ArrayList<String>rows,String tableName){
        String query="INSERT INTO " +tableName+" (";
        int iter=0;
        while(iter!=tableLabels.size()-1) {
            query = query + tableLabels.get(iter) + ", ";
            iter++;
        }
        query=query+tableLabels.get(iter)+")";

        for(String values:rows){
            String q=query+" VALUES("+values+");";
            System.out.println(q);
            session.execute(q);
        }
    }

    public static void main(String args[]) throws IOException {
        Scanner scan = new Scanner(System.in);

        CassandraConnector connector = new CassandraConnector();
        connector.connect("127.0.0.1", 9042, "datacenter1");
        session = connector.getSession();

        //Test inputs for createKeyspace method
        /*
        System.out.println("Enter the name of your keyspace.");
        String keyspaceName=scan.nextLine();
        createKeyspace(keyspaceName);
        */

        //------------------------------------------------------------------------------------------------------------------------------------

        //Test inputs for createTable method
        /*
        System.out.println("Enter the keyspace the table will be entered in.");
        String keyspaceName=scan.nextLine();
        String use="USE "+keyspaceName+";";
        session.execute(use);
        String tableName="",value = "", type = "";
        System.out.println("Enter the name of your table.");
        tableName = scan.nextLine();
        while (true) {
            System.out.println("Enter a new table label or 'end' if finished.");
            value = scan.nextLine();
            if (value.equals("end")) break;
            System.out.println("Enter the data type of the label (int,text,etc.)");
            type = scan.nextLine();
            tableLabels.put(value, type);
        }
        createTable(tableName,tableLabels);
        */

        //------------------------------------------------------------------------------------------------------------------------------------

        //Test inputs for createData method
        /*
        System.out.println("Enter the keyspace the data will be entered in.");
        String keyspaceName=scan.nextLine();
        String use="USE "+keyspaceName+";";
        session.execute(use);
        System.out.println("Enter the table the data will be entered in.");
        String tableName = scan.nextLine();
        ArrayList<String>TLA=new ArrayList<String>();
        Map<CqlIdentifier, ColumnMetadata> map = session.getMetadata().getKeyspace(keyspaceName).get().getTable(tableName).get().getColumns();
        Set<CqlIdentifier> set = map.keySet();
        StringBuilder s1 = new StringBuilder("");
        for (CqlIdentifier cqlIdentifier : set) {
            String s = map.get(cqlIdentifier).toString();
            s=s.substring(s.lastIndexOf(".")+1,s.lastIndexOf(" "));
            TLA.add(s);
        }
        System.out.print("Your column labels are: | ");
        for(String currLabel:TLA){
            System.out.print(currLabel+" | ");
        }
        System.out.println("");
        int row=1; String data=""; ArrayList<String>rowValues=new ArrayList<String>();
        while(true){
            System.out.println("Enter the values to be entered in row "+row+" as a single line with values separated by a comma. Type end after entering all data. Strings need ''.");
            System.out.println("Ex. 777777, '', 0, 'hello'");
            data=scan.nextLine();
            if(data.equals("end"))break;
            rowValues.add(data);
            row++;
        }
        createData(TLA,rowValues,tableName);
        */

        connector.close();
    }
}


