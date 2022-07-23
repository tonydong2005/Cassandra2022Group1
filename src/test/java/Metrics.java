import javax.swing.plaf.nimbus.State;
import java.util.HashMap;
import java.util.Map;

//Made by Athulya Saravankumar 7/20/22
//Runner Class for testing out metrics, must be incorporated into UI

public class Metrics {

    public void addData(String col1Value, String col2Value, States state, ModifyKeySpace table){
        Map<String, Object> CTV = new HashMap<String, Object>();
        CTV.put("col1", col1Value);
        CTV.put("col2", col2Value);
        table.insertRow("statemachine", CTV, 0, state);
    }

    public static void main(String[] args) {
        Metrics metobj = new Metrics();
        CassandraConnector connector = new CassandraConnector();
        connector.connect("127.0.0.1", 9042, "datacenter1");
        ModifyKeySpace table = new ModifyKeySpace(connector.getSession(), "tutorialspoint");
        States state = States.START;

        System.out.println(state.getNotifications());

        for(int i =0;i<3;i++){
            metobj.addData("" + i, "\'hi\'", state, table);
        }

        System.out.println(state.checkUpgrade());
        System.out.println(state);


        System.out.println(state.getNotifications());
        state = state.nextState();
        state.checkUpgrade();
        System.out.println(state.getNotifications());

        connector.close();
        }
    }









