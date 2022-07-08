import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.core.type.DataType;

import java.io.IOException;
import java.util.*;

/*
CreationMethodsRunner (Run this to create keyspace, table, and data without cqlsh)
Created by Tommy Fang 7/5/2022
 */

public class CreationMethodsRunner {

    public static void main(String args[]) throws IOException {
        String keyspaceName,tableName;
        Scanner scan = new Scanner(System.in);
        CassandraConnector connector = new CassandraConnector();
        connector.connect("127.0.0.1", 9042, "datacenter1");
        CreationMethods CM = new CreationMethods(connector.getSession());
        ModifierMethods MM = new ModifierMethods(connector.getSession());
        KeyspaceRepository KS=new KeyspaceRepository(connector.getSession());

        //Test inputs for createKeyspace method
        ///*
        System.out.println("Enter the name of your keyspace.");
        keyspaceName= scan.nextLine();
        CM.createKeyspace(keyspaceName);
        //*/

        //Test inputs for createTable method
        ///*
        System.out.println("Enter the keyspace the table will be entered in.");
        keyspaceName=scan.nextLine();
        ArrayList<String>labels=new ArrayList<String>();
        tableName=""; String input="";
        System.out.println("Enter the name of your table.");
        tableName = scan.nextLine();
        while (true) {
            System.out.println("Enter a new table label and the data type (int,text,etc.) or 'end' if finished.");
            System.out.println("Ex. col1 int");
            input = scan.nextLine();
            if (input.equals("end")) break;
            labels.add(input);
        }
        System.out.println("Enter the labels that you want to set as a partition key with ',' in between labels.");
        System.out.println("Ex. col1, col2");
        String partitionKeys=scan.nextLine();
        System.out.println("Enter the clustering column labels separated with ',' or skip if you don't want one.");
        String clusteringColumn=scan.nextLine();
        CM.createTable(keyspaceName,tableName,labels,partitionKeys, clusteringColumn);
        //*/

        //Test inputs for createData method
        ///*
        System.out.println("Enter the keyspace the data will be entered in.");
        keyspaceName=scan.nextLine();
        System.out.println("Enter the table the data will be entered in.");
        tableName = scan.nextLine();
        Map<CqlIdentifier, DataType>colDefs=KS.getColDefs(keyspaceName,tableName);
        System.out.print("Your column labels are: | ");
        for(Map.Entry<CqlIdentifier, DataType> currLabel : colDefs.entrySet()){
            System.out.print(currLabel.getKey()+" ("+currLabel.getValue()+") |");
        }
        System.out.println("");
        int row=1; String data=""; ArrayList<String>rows=new ArrayList<String>();
        while(true){
            System.out.println("Enter the values to be entered in row "+row+" as a single line with values separated by a comma. Type end after entering all data.");
            System.out.println("Ex. 777777, '', 0, 'hello'");
            data=scan.nextLine();
            if(data.equals("end"))break;
            rows.add(data);
            row++;
        }
        ArrayList<String>colDefsArray=new ArrayList<String>();
        colDefs.forEach((key,value) -> colDefsArray.add(String.valueOf(key)));
        CM.createData(keyspaceName,tableName,colDefsArray,rows);
        //*/

        connector.close();
    }
}
