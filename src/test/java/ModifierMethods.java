import com.datastax.oss.driver.api.core.CqlSession;
import com.datastax.oss.driver.api.core.cql.ResultSet;

import java.util.Map;

/*
ModifierMethods (allows insert, edit, and delete capabilities for a table)
Created by Tommy, Athulya, and Vikas 7/11/22
 */

public class ModifierMethods {
    private CqlSession session;
    public ModifierMethods(CqlSession session){
        this.session=session;
    }
    public boolean deleteRow(String keyspace,String table, Map<String, Object>PKV){
        StringBuilder query = new StringBuilder("DELETE FROM " + keyspace+"."+table + " WHERE ");
        PKV.forEach((key,value)->{
            query.append(key+"="+ value);
            query.append(" and ");
        });
        query.delete(query.length()-5,query.length());
        query.append(";");
        session.execute(String.valueOf(query));
        try{
            session.execute(String.valueOf(query));
            ResultSet a=session.execute(String.valueOf(query));

            return a.wasApplied();
        }
        catch (Exception e){
            return false;
        }
    }

    public boolean insertRow(String keyspace,String table, Map<String, Object>CTV, int TTL){
        StringBuilder query = new StringBuilder("INSERT INTO " + keyspace+"."+table + "(");
        CTV.forEach((key,value)->{
            query.append(key+", ");
        });
        query.delete(query.length()-2,query.length());
        query.append(") VALUES(");
        CTV.forEach((key,value)->{
            query.append(value+", ");
        });
        query.delete(query.length()-2,query.length());
        query.append(")");
        if(TTL>0){
            query.append(" USING TTL "+TTL);
        }
        query.append(";");
        try{
            session.execute(String.valueOf(query));
            ResultSet a=session.execute(String.valueOf(query));
            return a.wasApplied();
        }
        catch (Exception e){
            return false;
        }
    }

    public boolean editRow(String keyspace,String table, Map<String, Object>PKV,Map<String, Object>NPKV, int TTL){
        StringBuilder query = new StringBuilder("UPDATE " + keyspace+"."+table + " SET ");
        NPKV.forEach((key, value)->{
            query.append(key+"="+value+", ");
        });
        query.delete(query.length()-2,query.length());
        query.append(" WHERE ");
        PKV.forEach((key,value)->{
            query.append(key+"="+ value+" and ");
        });
        query.delete(query.length()-5,query.length());
        query.append(";");
        try{
            session.execute(String.valueOf(query));
            ResultSet a=session.execute(String.valueOf(query));
            return a.wasApplied();
        }
        catch (Exception e){
            return false;
        }
    }
}
