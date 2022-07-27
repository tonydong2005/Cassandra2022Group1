import java.util.List;

public class testi {
    public static void main(String args[]){
        CassandraConnector connector = new CassandraConnector();
        connector.connect("127.0.0.1", 9042, "datacenter1");
        CassandraAccessor C=new CassandraAccessor(connector.getSession());

        System.out.println(C.getKeyspaceList());

        connector.close();
    }
}
