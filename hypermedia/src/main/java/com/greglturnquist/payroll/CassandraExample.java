package com.greglturnquist.payroll;

import com.datastax.oss.driver.api.core.CqlSession;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

public class CassandraExample {

    public static void main(String args[]) {
        CassandraConnector connector = new CassandraConnector();
        connector.connect("127.0.0.1", 9042, "datacenter1");
        CqlSession session = connector.getSession();
        KeyspaceRepository keyspaceRepository = new KeyspaceRepository(session);

        System.out.println(keyspaceRepository.getPartitionList("testkeyspace", "partkeytest"));
        System.out.println(keyspaceRepository.getRowsPerPartition("testKeyspace", "partkeytest").get("(one)"));
        /*keyspaceRepository.createKeyspace("testKeyspace", 1);
        keyspaceRepository.useKeyspace("testKeyspace");

        VideoRepository videoRepository = new VideoRepository(session);
        videoRepository.createTable("testKeyspace", "testTableName");
        for (int i = 0; i < 5; i++){
            String TITLE = "";
            switch (i){
                case 0:
                    TITLE += "AMOGHERS";
                    break;
                case 1:
                    TITLE += "HEMUUUUU";
                    break;
                case 2:
                    TITLE += "KEHSAAVVVE";
                    break;
                case 3:
                    TITLE += "ANOOOOOJ";
                    break;
                case 4:
                    TITLE += "RISHINDRAXE";
                    break;
            }
            TITLE +=  "'s fortnite montage";
            videoRepository.insertVideo(new Video(TITLE, Instant.now().plus(i, ChronoUnit.SECONDS)), "testKeyspace", "testTableName");
        }
        List<String> cols = videoRepository.selectColumns("testKeyspace");
        List<Video> vids  = videoRepository.selectAll("testKeyspace");
        int vidTitleLength = 0;
        for (Video x: vids)
        {
            if(x.getTitle().length() > vidTitleLength)
                vidTitleLength = x.getTitle().length();
        }
        String format = cols.get(0) + "                        | " + cols.get(1) + "                          | " + cols.get(2) + "               ";
        System.out.println(format);
        for(int i = 0; i < format.length(); i++)
        {
            System.out.print("-");
        }
        System.out.println();
        for(Video x: vids)
        {
            StringBuilder y = new StringBuilder("");
            for(int i = 0; i < vidTitleLength - x.getTitle().length(); i++)
                y.append(" ");
            System.out.print(x.getId() + " | " + x.getTitle() + y + " | " + x.getCreationDate() + "\n");
        }*/



        connector.close();
    }
}