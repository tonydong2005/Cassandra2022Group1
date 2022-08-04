/**************************************************************************
 * ModifyKeyspace.java codes for the Java methods that modifies information
 * in the Cassandra database. Refer to any additional comments for details
 * about the code.
 *
 * Written by Tony Dong, Athulya Saravanakumar, Sophia Phu,
 * Rishindra Davuluri, Tommy Fang, Suhani Goswami,
 * Nitya Pakala, and Tejas Kalpathi.
 *
 * Big thanks to Vikas Thoutam for technical support.
 *
 * Last updated: 8/3/2022
 *************************************************************************/

package spring.repo;

import com.datastax.oss.driver.api.core.CqlIdentifier;
import com.datastax.oss.driver.api.core.cql.ResultSet;
import com.datastax.oss.driver.api.core.cql.Row;
import com.datastax.oss.driver.api.core.type.DataType;
import com.datastax.oss.driver.api.querybuilder.QueryBuilder;
import com.datastax.oss.driver.api.querybuilder.select.Select;
import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.metadata.schema.ColumnMetadata;

import java.util.*;

public class ModifyKeyspace {

    private CqlSession session;

    public ModifyKeyspace(CqlSession session) {
        this.session = session;
    }

    public List<String> getPrimaryKeyLabels(String keyspace, String tableName) {
        List<ColumnMetadata> urMom = session.getMetadata().getKeyspace(keyspace).get().getTable(tableName).get().getPrimaryKey();
        List<String> labels = new ArrayList<>();
        urMom.forEach(x -> labels.add(x.getName().asCql(true)));
        return labels;
    }

    public void editRow(String keyspace, String table, Map<String, Object> PKV, Map<String, Object> NPKV, int TTL) {
        StringBuilder query = new StringBuilder("UPDATE " + keyspace + "." + table + " SET ");
        NPKV.forEach((key, value) -> {
            query.append(key + "=" + value + ", ");
        });
        query.delete(query.length() - 2, query.length());
        query.append(" WHERE ");
        PKV.forEach((key, value) -> {
            query.append(key + "=" + value + " and ");
        });
        query.delete(query.length() - 5, query.length());
        query.append(";");
        System.out.println(query);
        session.execute(String.valueOf(query));
    }
    public boolean deleteRow(String keyspace,String table, Map<String, Object>PKV){
        StringBuilder query = new StringBuilder("DELETE FROM " + keyspace+"."+table + " WHERE ");
        PKV.forEach((key,value)->{
            query.append(key+"="+ value);
            query.append(" and ");
        });
        query.delete(query.length()-5,query.length());
        query.append(";");
        System.out.println(query);
        try{
            ResultSet a=session.execute(String.valueOf(query));
            return a.wasApplied();
        }
        catch (Exception e){
            return false;
        }
    }

    public void insertRow(String keyspace, String tableName, Map<String, Object> CTV, int ttlI) {
        StringBuilder query = new StringBuilder("INSERT INTO " + keyspace + "." + tableName + "(");
        CTV.forEach((key, value) -> {
            query.append(key + ", ");
        });
        query.delete(query.length() - 2, query.length());
        query.append(") VALUES(");
        CTV.forEach((key, value) -> {
            query.append(value + ", ");
        });
        query.delete(query.length() - 2, query.length());
        if (ttlI > 0) {
            query.append(") USING TTL " + ttlI + ";");
        } else
            query.append(");");
        session.execute(String.valueOf(query));
    }

    public List<Row> getPrimaryKeyValue(String keyspace, String tableName) {
        List<String> primaryKeyLabel = getPrimaryKeyLabels(keyspace, tableName);
        StringBuilder query = new StringBuilder("SELECT ");
        primaryKeyLabel.forEach(x -> query.append(x + ", "));
        query.delete(query.length() - 2, query.length());
        query.append(" FROM " + keyspace + "." + tableName);
        return session.execute(String.valueOf(query)).all();
    }

//    public List<Row> readTable(String keyspace, boolean entireTable, String tableName) {
//        StringBuilder query;
//        if (entireTable == true) {
//            query = new StringBuilder("SELECT * FROM " + keyspace + "." + tableName);
//        } else {
//            List<String> primaryKeyLabel = getPrimaryKeyLabels(keyspace, tableName);
//            Scanner sc = new Scanner(System.in);
//            System.out.println("What specific label do you want to read?");
//            String label = sc.next();
//            query = new StringBuilder("SELECT " + label + " FROM " + keyspace + "." + tableName);
//            session.execute(String.valueOf(query));
//        }
//        return session.execute(String.valueOf(query)).all();
//    }
//
//    public void dropTable(String tableName) {
//        StringBuilder query;
//        query = new StringBuilder("DROP TABLE " + tableName + ";");
//        session.execute(String.valueOf(query));
//    }
//--------------------------------------------------------------------------------------------------------------------------------

    public Map<CqlIdentifier, DataType> getColDefs(String keyspace, String table) {
        try {
            Map<CqlIdentifier, ColumnMetadata> map = session.getMetadata().getKeyspace(keyspace).get().getTable(table).get().getColumns();
            Set<CqlIdentifier> set = map.keySet();
            Map<CqlIdentifier, DataType> joe = new HashMap<>();
            map.forEach((key, value) -> joe.put(key, value.getType()));
            return joe;
        } catch (Exception e) {
            return null;
        }
    }

    public void copyTable(String ks, String table) {
        Select select = QueryBuilder.selectFrom(ks, table).all();
        ResultSet rs = session.execute(select.build());
        ArrayList<Row> result = (ArrayList<Row>) rs.all();
        for (Row x : result) {
            System.out.println(x); //-> @120398120941, @120948120, @1209821905  # of rows
        }
    }

//    public void updateDataNOTINUSELMFAO(String tableName, Map<String, Object> labelsandValues, Map<String, Object> labelsandnewValues) {
//        List<String> labels = getPrimaryKeyLabels(tableName);
//        StringBuilder query = new StringBuilder("UPDATE " + keyspace + "." + tableName);
//        query.append(" SET ");
//        labelsandnewValues.forEach((key, value) -> query.append(key + "=" + value.toString() + ", "));
//        query.deleteCharAt(query.length() - 2).append(" WHERE ");
//        labelsandValues.forEach((key, value) -> query.append(key + "=" + value + " and "));
//        query.delete(query.length() - 5, query.length()).append(";");
//        System.out.println(query);
//        session.execute(String.valueOf(query));
//    }

}