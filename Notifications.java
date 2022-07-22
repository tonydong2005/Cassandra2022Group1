public enum Notifications{
    UPGRADE{
        String upgrade = "Upgrade Server";
        public String getNotification(){
            return upgrade;
        }
    },
    NOUPGRADE{
        String upgrade = "Do NOT Upgrade Server";
        public String getNotification(){
            return upgrade;
        }
    };
    public abstract String getNotification();
}