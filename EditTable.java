import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.metadata.schema.ColumnMetadata;
import java.util.List;

//Athulya's Code :)

public class EditTable {

    private CqlSession session;
    private String keyspace;
    public EditTable(CqlSession session){
        this.session=session;
    }
    public List<ColumnMetadata> getPrimaryKey(String tableName, String ks){
        return session.getMetadata().getKeyspace(ks).get().getTable(tableName).get().getPrimaryKey();
    }

    public void setKeySpace(String ks){
        keyspace = ks;
    }

    public void deleteRow(String tableName){
        String query = "DELETE FROM " + tableName + "WHERE id = " + getPrimaryKey(tableName, keyspace);
        session.execute(query);
    }

 /* Future Methods*/

}
