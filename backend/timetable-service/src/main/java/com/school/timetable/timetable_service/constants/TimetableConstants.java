package com.school.timetable.timetable_service.constants;

import java.util.List;

public class TimetableConstants {

    public static final List<String> DAYS = List.of(
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday"
    );

    public static final int TOTAL_PERIODS = 8;

    public static final int LUNCH_PERIOD = 5;

    public static final int MAX_CONSECUTIVE_PERIODS = 3;
}