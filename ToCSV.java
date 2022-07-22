//import java.io.*;
//import java.util.ArrayList;
//import java.util.List;
//import java.util.Map;
//
//public class ToCSV {
//    public static void main(String[] args) throws IOException {
//        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
//        System.out.println("What node would you like to connect to?");
//        String node = br.readLine();
//        System.out.println("What port would you like to connect to?");
//        int portNum = -1;
//        boolean portsuccess = false;
//        do {
//            try {
//                String port = br.readLine();
//                portNum = Integer.parseInt(port);
//                portsuccess = true;
//            } catch (Exception e) {
//                System.out.println("Enter a valid port number.");
//            }
//        } while (!portsuccess);
//        System.out.println("What is the name of the datacenter you wish to connect to?");
//        String dataCenter = br.readLine();
//        System.out.println("Enter your username. (If none, simply press enter)");
//        String username = br.readLine();
//        System.out.println("Enter your password. (If none, simply press enter)");
//        String password = br.readLine();
//        System.out.println("Would you like to view System Table Statistics? (Cassandra Default Tables) Enter \"true\" if yes, otherwise enter \"false\".");
//        boolean systemKeyspaces = false;
//        boolean systemKeySuccess = false;
//        do
//        {
//            try {
//                String useSysKeySpace = br.readLine();
//                if(!useSysKeySpace.equalsIgnoreCase("true") && !useSysKeySpace.equalsIgnoreCase("false"))
//                {
//                    throw new InvalidObjectException("Bruh enter the right one");
//                }
//                systemKeyspaces = Boolean.parseBoolean(useSysKeySpace);
//                systemKeySuccess = true;
//            } catch (Exception e) {
//                System.out.println("Enter \"true\" if yes, otherwise enter \"false\".");
//            }
//        }while(!systemKeySuccess);
//        CassandraConnector connector = new CassandraConnector();
//        if(username.equals("") && password.equals(""))
//            connector.connect(node, portNum, dataCenter);
//        else
//            connector.connect(node, portNum, dataCenter, username, password);
//        PrintWriter csvWriter = new PrintWriter("table_data.csv");
//        PrintWriter clusterWriter = new PrintWriter("cluster_data.txt");
//        csvWriter.println("Keyspace Name,Table Name,Num Partitions,Partition Row Stats,Column Definitions,Table Size,Partition Size Stats");
//        KeyspaceRepository kR = new KeyspaceRepository(connector.getSession());
//        clusterWriter.println("Cluster Name: " + kR.clusterName());
//        clusterWriter.println("Tables in Cluster: " + kR.getTableList(null).size());
//        int userTables = 0;
//        //Batchamus bababoi = new Batchamus(connector.getSession(), null, null);
//        List<String> keyspaces = kR.getKeyspaceList();
//        List<String> systemKeys = new ArrayList<>();
//        systemKeys.add("system_auth");
//        systemKeys.add("system_schema");
//        systemKeys.add("system_distributed");
//        systemKeys.add("system");
//        systemKeys.add("system_traces");
//        systemKeys.add("dse_system_local");
//        systemKeys.add("dse_system");
//        systemKeys.add("dse_leases");
//        systemKeys.add("dse_insights");
//        systemKeys.add("dse_perf");
//        systemKeys.add("dse_security");
//        systemKeys.add("system_backups");
//        systemKeys.add("solr_admin");
//        systemKeys.add("dse_insights_local");
//        if (!systemKeyspaces) {
//            for (String space: systemKeys)
//            {
//                keyspaces.remove(space);
//            }
//        }
//        Map<String, String> tS = kR.getTableSizes();
//        for (String keyspace : keyspaces) {
//            List<String> tables = kR.getTableList(keyspace);
//            for (String table : tables) {
//                List<String> pL = kR.getPartitionList(keyspace, table);
//                Map<String, Integer> rPP = kR.getRowsPerPartition(keyspace, table);
//                String colDefs = kR.getColDefs(keyspace, table);
//                csvWriter.println(keyspace + "," + table + "," + pL.size() + "," + kR.statsTable(rPP)
//                        + "," + colDefs + "," + tS.get(keyspace+"."+table) + "," + kR.statsPart(rPP, tS.get(keyspace+"."+table)));
//                if(!systemKeys.contains(keyspace))
//                    userTables++;
//            }
//        }
//        clusterWriter.println("User Generated Tables in Cluster: " + userTables);
//        clusterWriter.println("Cluster Size: " + tS.get("Cluster"));
//        csvWriter.close();
//        clusterWriter.close();
//        connector.close();
//        System.out.println("This application ran successfully.");
//    }
//}