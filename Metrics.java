import java.util.HashMap;
import java.util.Map;

public class Metrics {
    public static void main(String[] args) {
        CassandraConnector connector = new CassandraConnector();
        connector.connect("127.0.0.1", 9042, "datacenter1");
        ModifyKeySpace table = new ModifyKeySpace(connector.getSession(), "tutorialspoint");
        Map<String, String> CTV = new HashMap<String, String>();
        States state = States.START;

        System.out.println(state.getNotifications());

        state = state.nextState();

        CTV.put("col1", "1");
        CTV.put("col2", "\'hi\'");

        table.insertRow("statemachine", CTV, 0, state);

        CTV.put("col1","2");
        CTV.put("col2","\'hello\'");

        table.insertRow("statemachine", CTV, 0, state);

        CTV.put("col1","3");
        CTV.put("col2","\'hi\'");

        table.insertRow("statemachine", CTV, 0, state);
        System.out.println(state.checkUpgrade());
        System.out.println(state);


        System.out.println(state.getNotifications());
        state = state.nextState();
        state.checkUpgrade();
        System.out.println(state.getNotifications());

        connector.close();

//        while (true) {
//            int i = sc.nextInt();
//            if (i == 0) {
//                state = States.END;
//            }
//            if (i == 1) {
//                state = States.RUNNING;
//            }
//
//            switch (state) {
//                case START:
//                    break;
//                case RUNNING:
//                    System.out.println("running");
//                    break;
//                case END:
//                    System.out.println("end");
//                    break;
//                default:
//                    System.out.println("ur MOM");
//                    break;
//            }
        }
    }









