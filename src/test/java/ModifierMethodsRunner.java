import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.core.type.DataType;
import java.io.IOException;
import java.util.*;

/*
ModifierMethodsRunner (Run this to insert, edit, and delete from a table)
Created by Tommy, Athulya, and Vikas 7/11/22
 */

public class ModifierMethodsRunner {
    public static void main(String args[]) throws IOException {
        String keyspaceName,tableName;
        int TTL;
        Map<CqlIdentifier, DataType>colDefs;
        Map<String, Object>CTV=new HashMap<>();
        Map<String, Object>PKV=new HashMap<>();
        List<String>PK;

        Scanner scan = new Scanner(System.in);
        CassandraConnector connector = new CassandraConnector();
        connector.connect("127.0.0.1", 9042, "datacenter1");
        ModifierMethods MM = new ModifierMethods(connector.getSession());
        CassandraAccessor C=new CassandraAccessor(connector.getSession());

        //Test inputs for deleteRow method
        System.out.println("Enter the name of your keyspace.");
        keyspaceName= scan.nextLine();
        System.out.println("Enter the name of your table.");
        tableName=scan.nextLine();
        colDefs=C.getColDefs(keyspaceName,tableName);
        colDefs.forEach((key,value) -> {
            System.out.println("Enter the value in "+key+" for the row you want to delete.");
            String input=scan.nextLine();
            CTV.put(key.toString(), input);
        });
        PK=C.getPrimaryKeyLabels(keyspaceName,tableName);
        PK.forEach(label->{
            PKV.put(label, CTV.getOrDefault(label,"You messed up."));
        });
        System.out.println(MM.deleteRow(keyspaceName,tableName, PKV));

        //Test inputs for insertRow method
        System.out.println("Enter the name of your keyspace.");
        keyspaceName= scan.nextLine();
        System.out.println("Enter the name of your table.");
        tableName=scan.nextLine();
        colDefs=C.getColDefs(keyspaceName,tableName);
        colDefs.forEach((key,value) -> {
            System.out.println("Enter the value you want to enter in "+key+".");
            String input=scan.nextLine();
            CTV.put(key.toString(), input);
        });
        System.out.println("Enter a TTL or 0 if you don't want to set it.");
        TTL=scan.nextInt();
        scan.nextLine();
        System.out.println(MM.insertRow(keyspaceName,tableName, CTV, TTL));

        //Test inputs for editRow method
        System.out.println("Enter the name of your keyspace.");
        keyspaceName= scan.nextLine();
        System.out.println("Enter the name of your table.");
        tableName=scan.nextLine();
        colDefs=C.getColDefs(keyspaceName,tableName);
        colDefs.forEach((key,value) -> {
            System.out.println("Enter the current value in "+key+".");
            String input=scan.nextLine();
            CTV.put(key.toString(), input);
        });
        PK=C.getPrimaryKeyLabels(keyspaceName,tableName);
        PK.forEach(label->{
            PKV.put(label, CTV.getOrDefault(label,"You messed up."));
            CTV.remove(label);
        });
        Map<String, Object>NPKV=new HashMap<>();
        CTV.forEach((key,value)->{
            System.out.println("Enter the new value of "+key+".");
            String input=scan.nextLine();
            NPKV.put(key,input);
        });
        System.out.println("Enter a TTL or 0 if you don't want to set it.");
        TTL=scan.nextInt();
        scan.nextLine();
        System.out.println(MM.editRow(keyspaceName,tableName, PKV,NPKV, TTL));

        connector.close();
    }
}
