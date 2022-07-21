import com.datastax.oss.driver.api.core.CqlSession;
import java.util.*;

/*
BankMethodsRunner
Created by Tommy and Vikas 7/17/22
*/

class BankMethods extends Thread {
    private CqlSession session;
    private double total,interest;
    private Map<String,Object>CTV;
    private ModifierMethods MM;
    private CassandraAccessor C;

    public BankMethods(CqlSession session, Map<String,Object>CTV, CassandraAccessor C){
        this.session=session;
        total=(double)CTV.get("current_balance"); interest=0.00;
        this.CTV=CTV;
        MM=new ModifierMethods(session);
        this.C=C;
    }

    public void deposit(double amt,Map<String,Object>CTV){
        total+=amt;
        CTV.replace("deposit",amt);
        CTV.replace("withdraw",0.00);
        CTV.replace("previous_balance",CTV.get("current_balance"));
        CTV.replace("current_balance",total);
        MM.insertRow("bank","myaccount", CTV, 0);
    }

    public void withdraw(double amt,Map<String,Object>CTV){
        total-=amt;
        CTV.replace("deposit",0.00);
        CTV.replace("withdraw",amt);
        CTV.replace("previous_balance",CTV.get("current_balance"));
        CTV.replace("current_balance",total);
        MM.insertRow("bank","myaccount", CTV, 0);
    }

    public void run(){
        while(true){
            try {
                Thread.sleep(10000);
                update(CTV);
                Map<String,Object>PKV=new HashMap<>();
                Map<String,Object>CCTV=new HashMap<>();
                CTV.forEach((key,value)->CCTV.put(key,value));
                List<String>PK=C.getPrimaryKeyLabels("bank","myaccount");
                PK.forEach(label->{
                    PKV.put(label, CTV.getOrDefault(label,"You messed up."));
                    CCTV.remove(label);
                });
                MM.editRow("bank","myaccount",PKV,CCTV,0);
            }
            catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
    }

    public void getCTV(){
        this.CTV=CTV;
    }

    public void update(Map<String,Object>CTV) {
        interest=total*0.0001*10;
        interest=Math.round(interest*100.0)/100.0;
        total+=interest;
        total=Math.round(total*100.0)/100.0;

        System.out.println("vikas added "+interest);

        CTV.replace("interest",interest);
        CTV.replace("previous_balance",CTV.get("current_balance"));
        CTV.replace("current_balance",total);
    }
}