import java.util.HashMap;
import java.util.Map;

//Made by Athulya Saravankumar 7/20/22
//Runner Class for testing out metrics, must be incorporated into UI

public class Metrics {
    public static void main(String[] args) {
        CassandraConnector connector = new CassandraConnector();
        connector.connect("127.0.0.1", 9042, "datacenter1");
        ModifyKeySpace table = new ModifyKeySpace(connector.getSession(), "tutorialspoint");
        Map<String, Object> CTV = new HashMap<String, Object>();
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
        }
    }









