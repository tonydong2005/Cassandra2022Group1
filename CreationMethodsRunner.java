import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.metadata.schema.ColumnMetadata;
import java.io.IOException;
import java.sql.Array;
import java.util.*;

/*
CreationMethodsRunner (Run this to create keyspace, table, and data without cqlsh) :O
Created by Tommy Fang 7/5/2022       :)

General notes:
Need Cassandra open to run (cqlsh isn't needed but can be used to check)
All test codes are separated an commented. The comments are there because YOU get to choose which to create. If you want to create all three, uncomment all three. If only a table, uncomment the create table test.
Tests are in the order: keyspace, table, data
All methods currently successfully work as checked by the creator
All red error lines appear to not affect the program's function. However, check if the keyspace, table, etc. are properly created
You need the CreationMethods file in order for this file to run
Exit code 0 means success
 */

public class CreationMethodsRunner {

    public static void main(String args[]) throws IOException {
        Scanner scan = new Scanner(System.in);

        CassandraConnector connector = new CassandraConnector();
        connector.connect("127.0.0.1", 9042, "datacenter1");
        CreationMethods CM=new CreationMethods(connector.getSession());

        //Test inputs for createKeyspace method
        /*
        System.out.println("Enter the name of your keyspace.");
        String keyspaceName=scan.nextLine();
        CM.createKeyspace(keyspaceName);
        */

        //------------------------------------------------------------------------------------------------------------------------------------

        //Test inputs for createTable method
        /*
        System.out.println("Enter the keyspace the table will be entered in.");
        String keyspaceName=scan.nextLine();
        String use="USE "+keyspaceName+";";
        connector.getSession().execute(use);
        Map<String,String> tableLabels = new HashMap<String,String>();
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
        CM.createTable(tableName,tableLabels);
        */

        //------------------------------------------------------------------------------------------------------------------------------------

        //Test inputs for createData method
        ///*
        System.out.println("Enter the keyspace the data will be entered in.");
        String keyspaceName=scan.nextLine();
        String use="USE "+keyspaceName+";";
        connector.getSession().execute(use);
        System.out.println("Enter the table the data will be entered in.");
        String tableName = scan.nextLine();
        ArrayList<String>TLA=new ArrayList<String>();
        Map<CqlIdentifier, ColumnMetadata> map = connector.getSession().getMetadata().getKeyspace(keyspaceName).get().getTable(tableName).get().getColumns();
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
        CM.createData(TLA,rowValues,tableName);
        //*/

        connector.close();
    }
}
