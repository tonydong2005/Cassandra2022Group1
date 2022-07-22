import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.cql.ResultSet;
import com.datastax.oss.driver.api.core.metadata.schema.ColumnMetadata;
import com.datastax.oss.driver.api.core.type.DataType;
import com.datastax.oss.driver.api.querybuilder.QueryBuilder;
import com.datastax.oss.driver.api.querybuilder.relation.Relation;
import com.datastax.oss.driver.api.querybuilder.select.Select;
import javafx.util.Pair;

import java.util.*;

public class CassandraAccessor {
    private CqlSession session;

    public CassandraAccessor(CqlSession session) {
        this.session = session;
    }

    public List<String> getKeyspaceList() {
        Select select = QueryBuilder.selectFrom("system_schema", "keyspaces").all();
        ResultSet rs = session.execute(select.build());
        List<String> result = new ArrayList<>();
        rs.forEach(x -> result.add(x.getString("keyspace_name")));
        return result;
    }

    public List<String> getTableList(String keyspace)
    {
        Select select = QueryBuilder.selectFrom("system_schema", "tables").columns("table_name");
        if (keyspace != null) {
            keyspace = keyspace.toLowerCase();
            select = select.where(Relation.column("keyspace_name").isEqualTo(QueryBuilder.literal(keyspace)));
        }
        ResultSet rs = session.execute(select.build());
        List<String> result = new ArrayList<>();
        rs.forEach(x -> result.add(x.getString("table_name")));
        return result;
    }

    public List<String>getLabels(String keyspace, String table){
        List<String>result=new ArrayList<>();
        Map<CqlIdentifier,DataType>colDefs=getColDefs(keyspace,table);
        colDefs.forEach((key,value)->{
            String s=key.toString()+" "+value.toString().toLowerCase();
            result.add(s);
        });
        return result;
    }

    public List<List<String>> getRows(String keyspace, String table){
        Select select=QueryBuilder.selectFrom(keyspace, table).all();
        ResultSet rs=session.execute(select.build());
        List<List<String>>result=new ArrayList<>();
        Map<CqlIdentifier,DataType>cd=getColDefs(keyspace,table);
        rs.forEach(pee->{
            List<String>poo=new ArrayList<>();
            cd.forEach((key,value)->{
                poo.add(pee.getObject(key).toString());
            });
            result.add(poo);
        });
        return result;
    }

    public Map<CqlIdentifier,DataType> getColDefs(String keyspace, String table)
    {
        try {
            Map<CqlIdentifier, ColumnMetadata> map = session.getMetadata().getKeyspace(keyspace).get().getTable(table).get().getColumns();
            Set<CqlIdentifier> set = map.keySet();

            //System.out.println(map);
            Map<CqlIdentifier,DataType>joe=new HashMap<>();
            map.forEach((key,value) -> joe.put(key,value.getType()));

            return joe;
        }
        catch (Exception e){
            return null;
        }
    }

    public List<String> getPrimaryKeyLabels(String keyspace, String table){
        List<ColumnMetadata> data =  session.getMetadata().getKeyspace(keyspace).get().getTable(table).get().getPrimaryKey();
        List<String> labels = new ArrayList<>();
        data.forEach(x-> labels.add(x.getName().asCql(true)));
        return labels;
    }
}