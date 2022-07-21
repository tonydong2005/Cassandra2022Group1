import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.core.type.DataType;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.*;

/*
BankMethodsRunner
Created by Tommy and Vikas 7/17/22

Important: Before running, you must create a keyspace and table in cqlsh using the cql below.
CREATE KEYSPACE Bank WITH replication = {'class':'SimpleStrategy', 'replication_factor' : 1};
CREATE TABLE MyAccount (Entry int, Deposit double, Withdraw double, Previous_Balance double,  Interest double, Current_Balance double,
PRIMARY KEY (Entry));
 */

public class BankMethodsRunner {
    public static void main(String args[]) throws IOException, InterruptedException {
        Scanner scan = new Scanner(System.in);
        Scanner read=new Scanner(new File("entry.txt"));
        CassandraConnector connector = new CassandraConnector();
        connector.connect("127.0.0.1", 9042, "datacenter1");
        CassandraAccessor C=new CassandraAccessor(connector.getSession());

        double amt=-1.00;
        int type=-1,entry=read.nextInt()+1;
        Map<CqlIdentifier, DataType>colDefs;
        Map<String, Object>CTV=new HashMap<>();
        colDefs= C.getColDefs("Bank","MyAccount");
        colDefs.forEach((key,value) -> {
            if(!key.toString().equals("entry"))CTV.put(key.toString(), read.nextDouble());
        });
        CTV.put("entry",entry);
        read.close();
        BankMethods BM=new BankMethods(connector.getSession(),CTV,C);
        BM.start();

        System.out.println(CTV);

        //Tests simple interest input (using rate of 5% and time in hours, interest added every 10 seconds)
        while(true) {
            System.out.println("Enter 1 to deposit, 2 to withdraw, or 0 to exit");
            type=scan.nextInt();
            if(type==0)break;
            else if(type==1){
                System.out.println("Enter deposit amount with 2 decimal places (i.e. 10.10 or 10.00).");
                amt=scan.nextDouble();
                CTV.replace("entry",entry);
                BM.deposit(amt,CTV);
            }
            else{
                System.out.println("Enter withdrawal amount with 2 decimal places (i.e. 10.10 or 10.00).");
                amt=scan.nextDouble();
                CTV.replace("entry",entry);
                BM.withdraw(amt,CTV);
            }

            entry++;
        }
        BM.stop();
        PrintWriter pw=new PrintWriter("entry.txt");
        CTV.forEach((key,value)->{
            pw.println(value);
        });
        pw.close();

        connector.close();
    }
}
