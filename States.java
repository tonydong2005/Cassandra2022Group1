//Made by Athulya Saravankumar 7/20/22

enum States {
     START{
        @Override
        boolean count(){
            return false;
        }

        @Override
        public States nextState(){
            return RUNNING;
        }

         @Override
         public boolean checkUpgrade(){
            return false;
         }

         @Override
         public String getNotifications(){
             return "Wrong State, @ START";
         }
    },

    RUNNING{
        public int numRows =0;
        public Notifications notifications = Notifications.NOUPGRADE;

        @Override
        boolean count(){
            numRows++;
            return true;
        }

        @Override
        public States nextState(){
            return END;
        }

        @Override
        public boolean checkUpgrade(){
            if(numRows>2){
                notifications = Notifications.UPGRADE;
            }
            return true;
        }

        @Override
        public String getNotifications(){
            return notifications.getNotification();
        }
    },

    END{

        @Override
        boolean count(){
        return false;
        }

        @Override
        public States nextState(){
            return START;
        }

        @Override
        public boolean checkUpgrade() {
            return false;
        }

        @Override
        public String getNotifications(){
            return "Wrong State, @ END";
        }
    };

    abstract boolean count();
    abstract States nextState();
    abstract boolean checkUpgrade();
    abstract String getNotifications();

}
