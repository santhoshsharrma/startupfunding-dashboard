import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from 'recharts';

const DEALS = [{"id": "SF0017", "sector": "EdTech", "city": "Ahmedabad", "date": "2023-07-02", "amount": 10182844, "stage": "Series B", "investors": 3}, {"id": "SF0081", "sector": "SaaS", "city": "Ahmedabad", "date": "2024-09-08", "amount": null, "stage": "Series A", "investors": 10}, {"id": "SF0186", "sector": "HealthTech", "city": "Jaipur", "date": null, "amount": 27457766, "stage": "Series A", "investors": 5}, {"id": "SF0327", "sector": "EdTech", "city": "Jaipur", "date": "2023-08-30", "amount": 41869142, "stage": "Series A", "investors": 2}, {"id": "SF0419", "sector": "HealthTech", "city": "Hyderabad", "date": "2023-10-07", "amount": 28368869, "stage": "Series A", "investors": 1}, {"id": "SF0498", "sector": "HealthTech", "city": "Kolkata", "date": "2023-03-24", "amount": 37836721, "stage": "Series A", "investors": 2}, {"id": "SF0127", "sector": "EdTech", "city": "Kolkata", "date": "2023-06-27", "amount": 32926741, "stage": "Series B", "investors": 6}, {"id": "SF0165", "sector": "AgriTech", "city": "Bengaluru", "date": "2023-01-03", "amount": 34793043, "stage": "Series C", "investors": 11}, {"id": "SF0333", "sector": "AgriTech", "city": "Mumbai", "date": "2024-04-28", "amount": 32463824, "stage": "Series C", "investors": 5}, {"id": "SF0131", "sector": "SaaS", "city": "Delhi", "date": "2023-01-20", "amount": 48008557, "stage": "Series B", "investors": 6}, {"id": "SF0128", "sector": "HealthTech", "city": "Mumbai", "date": "2023-12-21", "amount": 19019613, "stage": "Seed", "investors": 3}, {"id": "SF0162", "sector": "E-commerce", "city": "Lucknow", "date": "2024-05-18", "amount": 372555, "stage": "Seed", "investors": 9}, {"id": "SF0074", "sector": "HealthTech", "city": "Mumbai", "date": "2023-11-08", "amount": 13428758, "stage": "Seed", "investors": 9}, {"id": "SF0455", "sector": "Unknown", "city": "Mumbai", "date": "2023-01-12", "amount": 8858469, "stage": "Seed", "investors": 10}, {"id": "SF0228", "sector": "AgriTech", "city": "Delhi", "date": "2023-12-23", "amount": 20891194, "stage": "Series B", "investors": 4}, {"id": "SF0273", "sector": "E-commerce", "city": "Pune", "date": "2024-02-23", "amount": 10903410, "stage": "Series B", "investors": 4}, {"id": "SF0156", "sector": "AgriTech", "city": "Jaipur", "date": "2024-03-10", "amount": 22810492, "stage": "Series A", "investors": 5}, {"id": "SF0324", "sector": "FinTech", "city": "Jaipur", "date": "2023-05-01", "amount": 40852911, "stage": "Series A", "investors": 5}, {"id": "SF0190", "sector": "AgriTech", "city": "Lucknow", "date": "2024-09-04", "amount": 37513753, "stage": "Seed", "investors": 9}, {"id": "SF0212", "sector": "E-commerce", "city": "Kolkata", "date": "2024-07-18", "amount": 14295444, "stage": "Series C", "investors": 1}, {"id": "SF0171", "sector": "AgriTech", "city": "Ahmedabad", "date": "2023-03-02", "amount": 10752337, "stage": "Series A", "investors": 2}, {"id": "SF0015", "sector": "E-commerce", "city": "Hyderabad", "date": "2024-04-19", "amount": 25325774, "stage": "Seed", "investors": 5}, {"id": "SF0456", "sector": "E-commerce", "city": "Bengaluru", "date": "2023-05-20", "amount": 23536077, "stage": "Seed", "investors": 3}, {"id": "SF0476", "sector": "AgriTech", "city": "Delhi", "date": "2023-09-04", "amount": 30562429, "stage": "Series A", "investors": 3}, {"id": "SF0088", "sector": "E-commerce", "city": "Ahmedabad", "date": "2024-08-18", "amount": 46214836, "stage": "Series B", "investors": 10}, {"id": "SF0280", "sector": "EdTech", "city": "Ahmedabad", "date": "2023-02-27", "amount": 14752457, "stage": "Series A", "investors": 8}, {"id": "SF0028", "sector": "Unknown", "city": "Ahmedabad", "date": "2024-01-24", "amount": 30808274, "stage": "Series A", "investors": 8}, {"id": "SF0125", "sector": "AgriTech", "city": "Jaipur", "date": "2023-05-13", "amount": 47400736, "stage": "Series A", "investors": 1}, {"id": "SF0210", "sector": "AgriTech", "city": "Bengaluru", "date": "2024-06-08", "amount": 15965377, "stage": "Series B", "investors": 2}, {"id": "SF0473", "sector": "FinTech", "city": "Kolkata", "date": "2023-04-21", "amount": 36433551, "stage": "Series B", "investors": 8}, {"id": "SF0202", "sector": "SaaS", "city": "Chennai", "date": "2023-09-09", "amount": 16911852, "stage": "Series A", "investors": 4}, {"id": "SF0467", "sector": "FinTech", "city": "Bengaluru", "date": "2024-07-30", "amount": 24254423, "stage": "Seed", "investors": 7}, {"id": "SF0240", "sector": "E-commerce", "city": "Jaipur", "date": "2023-08-30", "amount": 342429, "stage": "Seed", "investors": 9}, {"id": "SF0112", "sector": "Unknown", "city": "Kolkata", "date": "2023-11-29", "amount": 17954878, "stage": "Series A", "investors": 2}, {"id": "SF0154", "sector": "HealthTech", "city": "Chennai", "date": "2023-06-04", "amount": 35918904, "stage": "Series A", "investors": 3}, {"id": "SF0038", "sector": "EdTech", "city": "Lucknow", "date": "2024-10-24", "amount": 46721463, "stage": "Series B", "investors": 3}, {"id": "SF0104", "sector": "E-commerce", "city": "Kolkata", "date": "2024-06-28", "amount": 21660358, "stage": "Series C", "investors": 9}, {"id": "SF0231", "sector": "EdTech", "city": "Delhi", "date": "2023-09-13", "amount": 37372560, "stage": "Series B", "investors": 3}, {"id": "SF0350", "sector": "SaaS", "city": "Bengaluru", "date": "2023-05-25", "amount": 21457915, "stage": "Seed", "investors": 4}, {"id": "SF0297", "sector": "E-commerce", "city": "Chennai", "date": "2023-03-11", "amount": 8963619, "stage": "Series C", "investors": 7}, {"id": "SF0288", "sector": "AgriTech", "city": "Jaipur", "date": "2024-03-29", "amount": 48273445, "stage": "Series B", "investors": 3}, {"id": "SF0215", "sector": "EdTech", "city": "Mumbai", "date": null, "amount": 45562462, "stage": "Series B", "investors": 9}, {"id": "SF0359", "sector": "FinTech", "city": "Ahmedabad", "date": "2023-09-28", "amount": 25717493, "stage": "Series C", "investors": 11}, {"id": "SF0449", "sector": "E-commerce", "city": "Ahmedabad", "date": "2023-09-05", "amount": 23162470, "stage": "Series C", "investors": 3}, {"id": "SF0375", "sector": "SaaS", "city": "Pune", "date": "2024-04-21", "amount": 46913733, "stage": "Series B", "investors": 3}, {"id": "SF0302", "sector": "SaaS", "city": "Chennai", "date": "2024-08-13", "amount": 34125342, "stage": "Series A", "investors": 9}, {"id": "SF0340", "sector": "HealthTech", "city": "Mumbai", "date": "2024-07-03", "amount": 13940646, "stage": "Seed", "investors": 8}, {"id": "SF0058", "sector": "AgriTech", "city": "Jaipur", "date": "2024-05-27", "amount": 7870639, "stage": "Seed", "investors": 1}, {"id": "SF0356", "sector": "E-commerce", "city": "Chennai", "date": "2024-01-09", "amount": 38001916, "stage": "Seed", "investors": 2}, {"id": "SF0252", "sector": "EdTech", "city": "Chennai", "date": "2023-01-26", "amount": 14015492, "stage": "Seed", "investors": 1}, {"id": "SF0305", "sector": "Unknown", "city": "Lucknow", "date": "2024-03-16", "amount": 11653725, "stage": "Series B", "investors": 6}, {"id": "SF0108", "sector": "AgriTech", "city": "Jaipur", "date": "2024-05-10", "amount": null, "stage": "Series B", "investors": 5}, {"id": "SF0271", "sector": "EdTech", "city": "Chennai", "date": "2023-06-07", "amount": null, "stage": "Series C", "investors": 3}, {"id": "SF0334", "sector": "Unknown", "city": "Kolkata", "date": "2024-05-25", "amount": 28325488, "stage": "Series A", "investors": 4}, {"id": "SF0346", "sector": "FinTech", "city": "Hyderabad", "date": "2024-02-23", "amount": null, "stage": "Series C", "investors": 9}, {"id": "SF0352", "sector": "HealthTech", "city": "Delhi", "date": "2023-11-05", "amount": 32980064, "stage": "Series A", "investors": 10}, {"id": "SF0411", "sector": "Unknown", "city": "Mumbai", "date": "2023-11-14", "amount": 36629568, "stage": "Series C", "investors": 8}, {"id": "SF0204", "sector": "FinTech", "city": "Mumbai", "date": "2023-07-20", "amount": 25614870, "stage": "Series A", "investors": 7}, {"id": "SF0140", "sector": "FinTech", "city": "Kolkata", "date": "2024-12-09", "amount": 24819355, "stage": "Series B", "investors": 8}, {"id": "SF0137", "sector": "EdTech", "city": "Delhi", "date": "2024-02-07", "amount": 11627453, "stage": "Series B", "investors": 10}, {"id": "SF0283", "sector": "FinTech", "city": "Jaipur", "date": "2024-03-26", "amount": 1621419, "stage": "Series C", "investors": 4}, {"id": "SF0343", "sector": "EdTech", "city": "Bengaluru", "date": "2023-04-24", "amount": 41241429, "stage": "Series C", "investors": 8}, {"id": "SF0197", "sector": "SaaS", "city": "Chennai", "date": "2024-11-04", "amount": 43974473, "stage": "Series C", "investors": 4}, {"id": "SF0289", "sector": "EdTech", "city": "Ahmedabad", "date": "2024-11-17", "amount": 12848199, "stage": "Series B", "investors": 9}, {"id": "SF0211", "sector": "SaaS", "city": "Hyderabad", "date": "2023-08-04", "amount": 42225212, "stage": "Series C", "investors": 11}, {"id": "SF0238", "sector": "FinTech", "city": "Bengaluru", "date": "2024-10-08", "amount": 17314484, "stage": "Seed", "investors": 5}, {"id": "SF0176", "sector": "HealthTech", "city": "Hyderabad", "date": "2023-05-28", "amount": 41104997, "stage": "Seed", "investors": 7}, {"id": "SF0041", "sector": "E-commerce", "city": "Lucknow", "date": "2024-03-10", "amount": 31742708, "stage": "Series C", "investors": 1}, {"id": "SF0052", "sector": "SaaS", "city": "Ahmedabad", "date": "2024-12-17", "amount": 10866864, "stage": "Series C", "investors": 9}, {"id": "SF0082", "sector": "EdTech", "city": "Ahmedabad", "date": "2024-12-28", "amount": 41323184, "stage": "Series C", "investors": 9}, {"id": "SF0391", "sector": "E-commerce", "city": "Delhi", "date": "2024-09-28", "amount": 11343033, "stage": "Seed", "investors": 3}, {"id": "SF0044", "sector": "EdTech", "city": "Kolkata", "date": "2023-11-10", "amount": 6436061, "stage": "Seed", "investors": 3}, {"id": "SF0378", "sector": "HealthTech", "city": "Kolkata", "date": "2024-11-24", "amount": 4825870, "stage": "Seed", "investors": 8}, {"id": "SF0470", "sector": "SaaS", "city": "Hyderabad", "date": "2024-12-09", "amount": 8485543, "stage": "Series B", "investors": 11}, {"id": "SF0103", "sector": "SaaS", "city": "Ahmedabad", "date": "2024-05-17", "amount": 22179369, "stage": "Series B", "investors": 7}, {"id": "SF0374", "sector": "HealthTech", "city": "Chennai", "date": "2023-01-12", "amount": 4029296, "stage": "Series B", "investors": 2}, {"id": "SF0458", "sector": "E-commerce", "city": "Bengaluru", "date": "2024-01-08", "amount": 9619224, "stage": "Series A", "investors": 10}, {"id": "SF0067", "sector": "HealthTech", "city": "Lucknow", "date": "2024-09-03", "amount": 26242741, "stage": "Series A", "investors": 5}, {"id": "SF0225", "sector": "SaaS", "city": "Kolkata", "date": "2024-07-05", "amount": 26056072, "stage": "Series B", "investors": 7}, {"id": "SF0344", "sector": "FinTech", "city": "Chennai", "date": null, "amount": 8118691, "stage": "Series B", "investors": 2}, {"id": "SF0226", "sector": "EdTech", "city": "Ahmedabad", "date": "2023-04-15", "amount": 11659748, "stage": "Seed", "investors": 6}, {"id": "SF0444", "sector": "HealthTech", "city": "Lucknow", "date": "2023-11-11", "amount": 48834830, "stage": "Series B", "investors": 5}, {"id": "SF0453", "sector": "EdTech", "city": "Mumbai", "date": "2023-06-01", "amount": 36147930, "stage": "Series C", "investors": 5}, {"id": "SF0331", "sector": "SaaS", "city": "Hyderabad", "date": "2024-07-23", "amount": 22832545, "stage": "Series C", "investors": 6}, {"id": "SF0016", "sector": "E-commerce", "city": "Jaipur", "date": "2023-05-06", "amount": 24691579, "stage": "Series B", "investors": 7}, {"id": "SF0113", "sector": "AgriTech", "city": "Pune", "date": "2023-08-08", "amount": 13424518, "stage": "Seed", "investors": 3}, {"id": "SF0248", "sector": "E-commerce", "city": "Mumbai", "date": "2023-04-27", "amount": 12172771, "stage": "Series B", "investors": 6}, {"id": "SF0145", "sector": "AgriTech", "city": "Kolkata", "date": "2023-11-19", "amount": 30874869, "stage": "Series A", "investors": 10}, {"id": "SF0370", "sector": "EdTech", "city": "Mumbai", "date": "2024-12-17", "amount": 4924535, "stage": "Series B", "investors": 11}, {"id": "SF0068", "sector": "EdTech", "city": "Bengaluru", "date": "2023-03-31", "amount": 1732880, "stage": "Series B", "investors": 4}, {"id": "SF0102", "sector": "HealthTech", "city": "Delhi", "date": "2024-01-17", "amount": 39168509, "stage": "Series B", "investors": 1}, {"id": "SF0187", "sector": "SaaS", "city": "Kolkata", "date": "2024-11-01", "amount": 2291329, "stage": "Seed", "investors": 5}, {"id": "SF0135", "sector": "SaaS", "city": "Pune", "date": "2023-06-17", "amount": 30741693, "stage": "Series B", "investors": 7}, {"id": "SF0330", "sector": "HealthTech", "city": "Hyderabad", "date": "2023-10-14", "amount": 11466529, "stage": "Series C", "investors": 3}, {"id": "SF0427", "sector": "AgriTech", "city": "Kolkata", "date": "2024-08-01", "amount": 12300425, "stage": "Seed", "investors": 9}, {"id": "SF0398", "sector": "SaaS", "city": "Delhi", "date": "2024-08-05", "amount": 40746204, "stage": "Series B", "investors": 4}, {"id": "SF0477", "sector": "AgriTech", "city": "Mumbai", "date": "2024-07-21", "amount": 14223655, "stage": "Seed", "investors": 10}, {"id": "SF0270", "sector": "E-commerce", "city": "Kolkata", "date": "2024-04-19", "amount": 10314676, "stage": "Series C", "investors": 9}, {"id": "SF0256", "sector": "EdTech", "city": "Pune", "date": "2024-09-03", "amount": 22971481, "stage": "Series B", "investors": 5}, {"id": "SF0422", "sector": "HealthTech", "city": "Chennai", "date": "2023-11-26", "amount": null, "stage": "Series B", "investors": 7}, {"id": "SF0329", "sector": "AgriTech", "city": "Mumbai", "date": "2023-06-05", "amount": 42996478, "stage": "Seed", "investors": 5}, {"id": "SF0138", "sector": "FinTech", "city": "Delhi", "date": "2023-11-10", "amount": 37592906, "stage": "Seed", "investors": 11}, {"id": "SF0403", "sector": "SaaS", "city": "Delhi", "date": "2023-11-17", "amount": 47301688, "stage": "Series B", "investors": 10}, {"id": "SF0311", "sector": "E-commerce", "city": "Lucknow", "date": "2023-02-03", "amount": 27332858, "stage": "Series C", "investors": 3}, {"id": "SF0362", "sector": "E-commerce", "city": "Delhi", "date": "2023-07-28", "amount": 7254135, "stage": "Series C", "investors": 5}, {"id": "SF0249", "sector": "FinTech", "city": "Hyderabad", "date": "2024-08-16", "amount": 33708265, "stage": "Series B", "investors": 2}, {"id": "SF0437", "sector": "SaaS", "city": "Mumbai", "date": "2024-04-12", "amount": 26268317, "stage": "Series B", "investors": 7}, {"id": "SF0117", "sector": "SaaS", "city": "Lucknow", "date": "2023-09-24", "amount": 13738643, "stage": "Seed", "investors": 5}, {"id": "SF0390", "sector": "FinTech", "city": "Bengaluru", "date": "2024-08-15", "amount": null, "stage": "Series C", "investors": 8}, {"id": "SF0321", "sector": "E-commerce", "city": "Kolkata", "date": "2023-09-20", "amount": 33824580, "stage": "Series B", "investors": 4}, {"id": "SF0160", "sector": "SaaS", "city": "Ahmedabad", "date": "2024-11-04", "amount": 49886287, "stage": "Series C", "investors": 3}, {"id": "SF0394", "sector": "AgriTech", "city": "Pune", "date": "2024-03-15", "amount": 19480420, "stage": "Series C", "investors": 11}, {"id": "SF0396", "sector": "E-commerce", "city": "Bengaluru", "date": "2024-12-04", "amount": 3513762, "stage": "Seed", "investors": 11}, {"id": "SF0219", "sector": "FinTech", "city": "Kolkata", "date": "2024-06-09", "amount": 33180003, "stage": "Series B", "investors": 11}, {"id": "SF0408", "sector": "FinTech", "city": "Pune", "date": "2023-10-01", "amount": 8135161, "stage": "Series C", "investors": 9}, {"id": "SF0084", "sector": "AgriTech", "city": "Bengaluru", "date": "2024-12-16", "amount": 45678856, "stage": "Series B", "investors": 6}, {"id": "SF0245", "sector": "AgriTech", "city": "Bengaluru", "date": "2024-10-08", "amount": 29204154, "stage": "Series C", "investors": 1}, {"id": "SF0242", "sector": "HealthTech", "city": "Delhi", "date": "2024-07-10", "amount": 850651, "stage": "Seed", "investors": 10}, {"id": "SF0315", "sector": "AgriTech", "city": "Jaipur", "date": "2024-05-12", "amount": 14928239, "stage": "Seed", "investors": 8}, {"id": "SF0062", "sector": "FinTech", "city": "Mumbai", "date": "2023-10-21", "amount": 8634804, "stage": "Series C", "investors": 8}, {"id": "SF0435", "sector": "Unknown", "city": "Delhi", "date": "2024-10-13", "amount": 37639593, "stage": "Series C", "investors": 8}, {"id": "SF0348", "sector": "E-commerce", "city": "Kolkata", "date": "2023-03-25", "amount": 14221801, "stage": "Series C", "investors": 5}, {"id": "SF0133", "sector": "FinTech", "city": "Bengaluru", "date": "2023-03-19", "amount": 37092925, "stage": "Series C", "investors": 6}, {"id": "SF0178", "sector": "SaaS", "city": "Bengaluru", "date": "2023-11-20", "amount": 39294778, "stage": "Seed", "investors": 9}, {"id": "SF0060", "sector": "FinTech", "city": "Ahmedabad", "date": "2023-02-10", "amount": 7250215, "stage": "Series B", "investors": 4}, {"id": "SF0205", "sector": "EdTech", "city": "Pune", "date": "2023-07-20", "amount": 14861121, "stage": "Series C", "investors": 9}, {"id": "SF0106", "sector": "EdTech", "city": "Bengaluru", "date": "2023-10-21", "amount": 40076574, "stage": "Series C", "investors": 7}, {"id": "SF0011", "sector": "EdTech", "city": "Hyderabad", "date": "2024-04-04", "amount": 29289920, "stage": "Series A", "investors": 2}, {"id": "SF0056", "sector": "EdTech", "city": "Jaipur", "date": "2024-07-12", "amount": 7616124, "stage": "Series A", "investors": 2}, {"id": "SF0459", "sector": "E-commerce", "city": "Ahmedabad", "date": "2023-03-03", "amount": 39115256, "stage": "Seed", "investors": 6}, {"id": "SF0443", "sector": "SaaS", "city": "Jaipur", "date": "2024-03-15", "amount": 9033630, "stage": "Series B", "investors": 3}, {"id": "SF0057", "sector": "AgriTech", "city": "Hyderabad", "date": "2024-05-23", "amount": 46561659, "stage": "Series A", "investors": 10}, {"id": "SF0366", "sector": "FinTech", "city": "Hyderabad", "date": "2024-05-02", "amount": 8374878, "stage": "Series A", "investors": 7}, {"id": "SF0167", "sector": "E-commerce", "city": "Pune", "date": "2024-07-22", "amount": 4157503, "stage": "Series B", "investors": 9}, {"id": "SF0089", "sector": "HealthTech", "city": "Chennai", "date": "2023-05-25", "amount": 35968961, "stage": "Seed", "investors": 11}, {"id": "SF0272", "sector": "SaaS", "city": "Kolkata", "date": "2023-06-07", "amount": 41937850, "stage": "Series C", "investors": 6}, {"id": "SF0025", "sector": "HealthTech", "city": "Delhi", "date": "2024-09-11", "amount": 49207615, "stage": "Series A", "investors": null}, {"id": "SF0115", "sector": "E-commerce", "city": "Kolkata", "date": "2024-08-16", "amount": 6140343, "stage": "Series B", "investors": 7}, {"id": "SF0402", "sector": "HealthTech", "city": "Jaipur", "date": "2024-10-22", "amount": 10788153, "stage": "Series C", "investors": 8}, {"id": "SF0032", "sector": "AgriTech", "city": "Jaipur", "date": "2024-05-16", "amount": 16425133, "stage": "Series B", "investors": 1}, {"id": "SF0345", "sector": "FinTech", "city": "Mumbai", "date": "2024-07-03", "amount": 31946496, "stage": "Seed", "investors": 10}, {"id": "SF0462", "sector": "E-commerce", "city": "Chennai", "date": "2024-09-18", "amount": 34749593, "stage": "Series A", "investors": 3}, {"id": "SF0354", "sector": "FinTech", "city": "Mumbai", "date": "2024-02-14", "amount": 19636129, "stage": "Series A", "investors": 11}, {"id": "SF0442", "sector": "E-commerce", "city": "Bengaluru", "date": "2024-12-15", "amount": 45621474, "stage": "Seed", "investors": 8}, {"id": "SF0191", "sector": "HealthTech", "city": "Lucknow", "date": "2024-09-09", "amount": 6458722, "stage": "Series A", "investors": 4}, {"id": "SF0158", "sector": "SaaS", "city": "Bengaluru", "date": "2023-07-01", "amount": 36481773, "stage": "Series A", "investors": 9}, {"id": "SF0400", "sector": "HealthTech", "city": "Pune", "date": "2024-12-15", "amount": 33209662, "stage": "Series A", "investors": 1}, {"id": "SF0451", "sector": "E-commerce", "city": "Lucknow", "date": "2023-02-04", "amount": 697581, "stage": "Series C", "investors": 7}, {"id": "SF0198", "sector": "EdTech", "city": "Ahmedabad", "date": "2024-10-17", "amount": 17148847, "stage": "Seed", "investors": 1}, {"id": "SF0129", "sector": "HealthTech", "city": "Jaipur", "date": "2024-04-16", "amount": 27218740, "stage": "Series C", "investors": 6}, {"id": "SF0471", "sector": "EdTech", "city": "Ahmedabad", "date": "2023-02-09", "amount": 1015933, "stage": "Series C", "investors": 4}, {"id": "SF0124", "sector": "AgriTech", "city": "Chennai", "date": "2023-08-16", "amount": 5832897, "stage": "Seed", "investors": null}, {"id": "SF0339", "sector": "E-commerce", "city": "Pune", "date": "2024-06-24", "amount": 24424431, "stage": "Series A", "investors": 11}, {"id": "SF0279", "sector": "SaaS", "city": "Jaipur", "date": "2023-04-01", "amount": 32406207, "stage": "Series B", "investors": null}, {"id": "SF0480", "sector": "HealthTech", "city": "Chennai", "date": "2024-08-31", "amount": 43003724, "stage": "Seed", "investors": 6}, {"id": "SF0099", "sector": "FinTech", "city": "Pune", "date": "2023-07-31", "amount": 11070429, "stage": "Series A", "investors": 2}, {"id": "SF0300", "sector": "EdTech", "city": "Ahmedabad", "date": "2024-01-03", "amount": 32157934, "stage": "Seed", "investors": 5}, {"id": "SF0299", "sector": "HealthTech", "city": "Bengaluru", "date": "2023-02-16", "amount": 3254051, "stage": "Series B", "investors": 7}, {"id": "SF0465", "sector": "SaaS", "city": "Bengaluru", "date": "2024-03-23", "amount": 6136096, "stage": "Series A", "investors": 3}, {"id": "SF0295", "sector": "SaaS", "city": "Bengaluru", "date": "2023-03-19", "amount": 34480325, "stage": "Series A", "investors": 10}, {"id": "SF0255", "sector": "AgriTech", "city": "Delhi", "date": "2023-09-19", "amount": 22641611, "stage": "Series C", "investors": 4}, {"id": "SF0147", "sector": "FinTech", "city": "Ahmedabad", "date": "2024-10-24", "amount": 46299574, "stage": "Series A", "investors": 7}, {"id": "SF0181", "sector": "SaaS", "city": "Delhi", "date": "2024-11-24", "amount": 24004146, "stage": "Series C", "investors": 11}, {"id": "SF0357", "sector": "SaaS", "city": "Lucknow", "date": "2024-04-28", "amount": 20554011, "stage": "Series C", "investors": 3}, {"id": "SF0303", "sector": "E-commerce", "city": "Kolkata", "date": "2024-03-24", "amount": 36545909, "stage": "Series A", "investors": 2}, {"id": "SF0241", "sector": "AgriTech", "city": "Chennai", "date": "2024-05-06", "amount": 17525078, "stage": "Series B", "investors": 5}, {"id": "SF0388", "sector": "EdTech", "city": "Kolkata", "date": "2023-01-09", "amount": 13190757, "stage": "Seed", "investors": 9}, {"id": "SF0282", "sector": "E-commerce", "city": "Ahmedabad", "date": "2024-02-18", "amount": 10426642, "stage": "Seed", "investors": 4}, {"id": "SF0341", "sector": "AgriTech", "city": "Chennai", "date": "2023-10-08", "amount": 15748008, "stage": "Series A", "investors": 9}, {"id": "SF0109", "sector": "HealthTech", "city": "Mumbai", "date": "2024-12-23", "amount": 48338953, "stage": "Series C", "investors": 6}, {"id": "SF0274", "sector": "EdTech", "city": "Bengaluru", "date": "2024-11-09", "amount": 18812728, "stage": "Series B", "investors": 8}, {"id": "SF0004", "sector": "FinTech", "city": "Jaipur", "date": "2024-03-22", "amount": 31485678, "stage": "Series A", "investors": 8}, {"id": "SF0407", "sector": "EdTech", "city": "Lucknow", "date": "2023-03-08", "amount": 22114662, "stage": "Series B", "investors": 3}, {"id": "SF0195", "sector": "HealthTech", "city": "Ahmedabad", "date": "2024-09-09", "amount": 27383057, "stage": "Series A", "investors": 7}, {"id": "SF0083", "sector": "SaaS", "city": "Delhi", "date": "2023-07-18", "amount": 32459102, "stage": "Seed", "investors": 5}, {"id": "SF0262", "sector": "AgriTech", "city": "Delhi", "date": "2023-10-24", "amount": 14357009, "stage": "Series B", "investors": 2}, {"id": "SF0054", "sector": "E-commerce", "city": "Hyderabad", "date": "2023-08-13", "amount": 20723556, "stage": "Seed", "investors": 9}, {"id": "SF0261", "sector": "SaaS", "city": "Ahmedabad", "date": "2023-08-02", "amount": 24827582, "stage": "Series C", "investors": 7}, {"id": "SF0085", "sector": "SaaS", "city": "Delhi", "date": "2023-07-02", "amount": 44448084, "stage": "Series B", "investors": 1}, {"id": "SF0438", "sector": "E-commerce", "city": "Chennai", "date": "2023-05-26", "amount": 33422030, "stage": "Series B", "investors": 7}, {"id": "SF0180", "sector": "FinTech", "city": "Bengaluru", "date": "2024-06-24", "amount": 28296725, "stage": "Series C", "investors": 6}, {"id": "SF0495", "sector": "HealthTech", "city": "Pune", "date": "2024-09-18", "amount": 34997294, "stage": "Series A", "investors": 11}, {"id": "SF0230", "sector": "E-commerce", "city": "Delhi", "date": "2023-05-26", "amount": 3088986, "stage": "Series A", "investors": 3}, {"id": "SF0432", "sector": "EdTech", "city": "Delhi", "date": "2024-05-26", "amount": 27478776, "stage": "Series C", "investors": 4}, {"id": "SF0234", "sector": "SaaS", "city": "Ahmedabad", "date": "2024-05-17", "amount": 49937975, "stage": "Seed", "investors": 4}, {"id": "SF0075", "sector": "SaaS", "city": "Jaipur", "date": "2024-09-07", "amount": 32793902, "stage": "Series B", "investors": 7}, {"id": "SF0466", "sector": "HealthTech", "city": "Pune", "date": "2024-12-11", "amount": 32264179, "stage": "Seed", "investors": 1}, {"id": "SF0413", "sector": "HealthTech", "city": "Hyderabad", "date": "2024-04-23", "amount": 31756384, "stage": "Series C", "investors": 1}, {"id": "SF0497", "sector": "SaaS", "city": "Hyderabad", "date": "2024-12-01", "amount": 44971158, "stage": "Series A", "investors": 6}, {"id": "SF0491", "sector": "HealthTech", "city": "Mumbai", "date": "2023-01-07", "amount": null, "stage": "Series A", "investors": 1}, {"id": "SF0024", "sector": "AgriTech", "city": "Lucknow", "date": "2024-11-02", "amount": 17447971, "stage": "Series C", "investors": 11}, {"id": "SF0155", "sector": "EdTech", "city": "Chennai", "date": "2024-11-06", "amount": 16683348, "stage": "Seed", "investors": 6}, {"id": "SF0434", "sector": "HealthTech", "city": "Bengaluru", "date": "2024-09-11", "amount": 14327121, "stage": "Series B", "investors": 6}, {"id": "SF0192", "sector": "SaaS", "city": "Kolkata", "date": "2024-02-03", "amount": 10890158, "stage": "Seed", "investors": null}, {"id": "SF0287", "sector": "AgriTech", "city": "Pune", "date": "2024-02-28", "amount": 42931568, "stage": "Series C", "investors": 7}, {"id": "SF0019", "sector": "FinTech", "city": "Kolkata", "date": "2024-08-12", "amount": 19476156, "stage": "Seed", "investors": 2}, {"id": "SF0318", "sector": "HealthTech", "city": "Ahmedabad", "date": "2024-11-15", "amount": 22163431, "stage": "Series B", "investors": 4}, {"id": "SF0051", "sector": "FinTech", "city": "Pune", "date": "2023-01-01", "amount": 36118826, "stage": "Seed", "investors": 9}, {"id": "SF0039", "sector": "EdTech", "city": "Jaipur", "date": "2024-03-25", "amount": 20792760, "stage": "Seed", "investors": 5}, {"id": "SF0194", "sector": "SaaS", "city": "Jaipur", "date": "2024-05-04", "amount": 6755056, "stage": "Series B", "investors": 2}, {"id": "SF0418", "sector": "E-commerce", "city": "Chennai", "date": "2024-01-19", "amount": 19908580, "stage": "Series A", "investors": 10}, {"id": "SF0189", "sector": "EdTech", "city": "Kolkata", "date": "2023-09-03", "amount": 13293353, "stage": "Series A", "investors": 7}, {"id": "SF0493", "sector": "EdTech", "city": "Bengaluru", "date": "2023-01-26", "amount": 40637248, "stage": "Series C", "investors": 7}, {"id": "SF0006", "sector": "FinTech", "city": "Pune", "date": null, "amount": 2694524, "stage": "Series B", "investors": 5}, {"id": "SF0076", "sector": "E-commerce", "city": "Bengaluru", "date": "2024-10-28", "amount": 694877430, "stage": "Series C", "investors": 7}, {"id": "SF0143", "sector": "SaaS", "city": "Chennai", "date": "2024-08-08", "amount": 11758367, "stage": "Series B", "investors": 1}, {"id": "SF0048", "sector": "FinTech", "city": "Jaipur", "date": "2024-06-01", "amount": 28031682, "stage": "Series B", "investors": 3}, {"id": "SF0047", "sector": "FinTech", "city": "Bengaluru", "date": "2024-03-29", "amount": 18847335, "stage": "Series C", "investors": 2}, {"id": "SF0071", "sector": "FinTech", "city": "Jaipur", "date": "2024-02-29", "amount": 36702828, "stage": "Series A", "investors": 5}, {"id": "SF0080", "sector": "AgriTech", "city": "Bengaluru", "date": "2023-10-06", "amount": 1179695, "stage": "Seed", "investors": 11}, {"id": "SF0031", "sector": "EdTech", "city": "Bengaluru", "date": "2024-11-12", "amount": 5338756, "stage": "Series C", "investors": 1}, {"id": "SF0012", "sector": "FinTech", "city": "Bengaluru", "date": "2024-04-18", "amount": 1015618, "stage": "Series A", "investors": 9}, {"id": "SF0358", "sector": "EdTech", "city": "Pune", "date": "2023-07-06", "amount": 34075858, "stage": "Series B", "investors": 8}, {"id": "SF0482", "sector": "EdTech", "city": "Kolkata", "date": "2023-01-11", "amount": 273238380, "stage": "Series B", "investors": 5}, {"id": "SF0454", "sector": "HealthTech", "city": "Lucknow", "date": "2024-05-23", "amount": 20571628, "stage": "Series C", "investors": 11}, {"id": "SF0269", "sector": "HealthTech", "city": "Kolkata", "date": "2024-02-09", "amount": 35924862, "stage": "Series C", "investors": 5}, {"id": "SF0116", "sector": "EdTech", "city": "Delhi", "date": "2023-05-27", "amount": 25276657, "stage": "Series C", "investors": 6}, {"id": "SF0026", "sector": "EdTech", "city": "Lucknow", "date": "2023-03-30", "amount": 18362505, "stage": "Series A", "investors": 9}, {"id": "SF0447", "sector": "AgriTech", "city": "Mumbai", "date": "2023-03-28", "amount": 44242790, "stage": "Series C", "investors": 4}, {"id": "SF0196", "sector": "E-commerce", "city": "Chennai", "date": "2023-09-08", "amount": 37279787, "stage": "Series A", "investors": 4}, {"id": "SF0385", "sector": "HealthTech", "city": "Ahmedabad", "date": "2024-12-12", "amount": 14531928, "stage": "Series A", "investors": 8}, {"id": "SF0066", "sector": "SaaS", "city": "Chennai", "date": "2023-11-11", "amount": 30078714, "stage": "Seed", "investors": 4}, {"id": "SF0360", "sector": "AgriTech", "city": "Kolkata", "date": "2024-04-23", "amount": 20548274, "stage": "Series B", "investors": 5}, {"id": "SF0046", "sector": "SaaS", "city": "Hyderabad", "date": "2023-07-07", "amount": 31024874, "stage": "Series A", "investors": 7}, {"id": "SF0431", "sector": "EdTech", "city": "Ahmedabad", "date": "2024-05-14", "amount": 10596475, "stage": "Seed", "investors": 6}, {"id": "SF0417", "sector": "E-commerce", "city": "Hyderabad", "date": "2024-05-14", "amount": 25850790, "stage": "Series C", "investors": 10}, {"id": "SF0496", "sector": "FinTech", "city": "Ahmedabad", "date": "2024-09-24", "amount": 47147447, "stage": "Series C", "investors": 3}, {"id": "SF0404", "sector": "HealthTech", "city": "Chennai", "date": "2024-12-07", "amount": 14326199, "stage": "Series A", "investors": 2}, {"id": "SF0244", "sector": "EdTech", "city": "Ahmedabad", "date": "2023-08-27", "amount": 18050870, "stage": "Series B", "investors": 9}, {"id": "SF0474", "sector": "FinTech", "city": "Delhi", "date": "2023-09-16", "amount": 49731468, "stage": "Series B", "investors": 11}, {"id": "SF0488", "sector": "FinTech", "city": "Lucknow", "date": "2023-02-08", "amount": null, "stage": "Series A", "investors": 6}, {"id": "SF0267", "sector": "AgriTech", "city": "Hyderabad", "date": "2023-02-28", "amount": 38411139, "stage": "Series C", "investors": 3}, {"id": "SF0069", "sector": "AgriTech", "city": "Pune", "date": "2024-11-05", "amount": 42286341, "stage": "Seed", "investors": 5}, {"id": "SF0022", "sector": "HealthTech", "city": "Jaipur", "date": "2023-07-19", "amount": 13701329, "stage": "Seed", "investors": 11}, {"id": "SF0078", "sector": "HealthTech", "city": "Kolkata", "date": "2024-05-13", "amount": 46526278, "stage": "Series A", "investors": 2}, {"id": "SF0306", "sector": "FinTech", "city": "Hyderabad", "date": "2024-05-28", "amount": 3069338, "stage": "Seed", "investors": 11}, {"id": "SF0450", "sector": "FinTech", "city": "Ahmedabad", "date": "2023-08-31", "amount": 15238510, "stage": "Seed", "investors": 2}, {"id": "SF0237", "sector": "HealthTech", "city": "Chennai", "date": "2024-12-28", "amount": 35648903, "stage": "Series B", "investors": 7}, {"id": "SF0291", "sector": "E-commerce", "city": "Pune", "date": "2023-08-23", "amount": 5245159, "stage": "Series C", "investors": 8}, {"id": "SF0285", "sector": "FinTech", "city": "Jaipur", "date": "2024-03-30", "amount": 14149347, "stage": "Series A", "investors": 11}, {"id": "SF0059", "sector": "E-commerce", "city": "Kolkata", "date": "2024-10-14", "amount": 12176387, "stage": "Series B", "investors": 7}, {"id": "SF0126", "sector": "EdTech", "city": "Delhi", "date": "2023-06-03", "amount": 42702530, "stage": "Series A", "investors": 11}, {"id": "SF0229", "sector": "EdTech", "city": "Lucknow", "date": "2023-07-04", "amount": 25578456, "stage": "Series B", "investors": 11}, {"id": "SF0043", "sector": "SaaS", "city": "Bengaluru", "date": "2023-10-11", "amount": 9746671, "stage": "Series C", "investors": 7}, {"id": "SF0005", "sector": "FinTech", "city": "Delhi", "date": "2023-06-16", "amount": 33676639, "stage": "Series B", "investors": 11}, {"id": "SF0122", "sector": "AgriTech", "city": "Bengaluru", "date": null, "amount": 43792311, "stage": "Series B", "investors": 9}, {"id": "SF0169", "sector": "SaaS", "city": "Jaipur", "date": "2024-11-27", "amount": null, "stage": "Seed", "investors": 7}, {"id": "SF0141", "sector": "FinTech", "city": "Hyderabad", "date": "2024-01-18", "amount": 27945862, "stage": "Series C", "investors": 4}, {"id": "SF0314", "sector": "SaaS", "city": "Hyderabad", "date": "2024-12-09", "amount": 1937145, "stage": "Series C", "investors": 10}, {"id": "SF0065", "sector": "E-commerce", "city": "Mumbai", "date": "2024-07-31", "amount": 5208282, "stage": "Series A", "investors": 9}, {"id": "SF0425", "sector": "HealthTech", "city": "Hyderabad", "date": "2023-10-28", "amount": 35065621, "stage": "Series A", "investors": 2}, {"id": "SF0110", "sector": "E-commerce", "city": "Pune", "date": "2024-12-11", "amount": 3687761, "stage": "Series C", "investors": 8}, {"id": "SF0281", "sector": "FinTech", "city": "Lucknow", "date": "2024-04-05", "amount": 40818655, "stage": "Series A", "investors": 2}, {"id": "SF0119", "sector": "HealthTech", "city": "Ahmedabad", "date": "2023-10-22", "amount": 12566145, "stage": "Series B", "investors": 5}, {"id": "SF0206", "sector": "HealthTech", "city": "Delhi", "date": "2024-06-23", "amount": 13930179, "stage": "Series B", "investors": 2}, {"id": "SF0499", "sector": "EdTech", "city": "Pune", "date": "2023-12-23", "amount": 23001137, "stage": "Series A", "investors": 7}, {"id": "SF0007", "sector": "SaaS", "city": "Lucknow", "date": "2024-03-28", "amount": 16675306, "stage": "Series B", "investors": 7}, {"id": "SF0263", "sector": "FinTech", "city": "Mumbai", "date": "2023-06-30", "amount": 604018, "stage": "Series B", "investors": 1}, {"id": "SF0307", "sector": "HealthTech", "city": "Kolkata", "date": "2024-08-10", "amount": 13135823, "stage": "Series A", "investors": 5}, {"id": "SF0260", "sector": "AgriTech", "city": "Bengaluru", "date": "2023-07-21", "amount": 47973631, "stage": "Series C", "investors": 9}, {"id": "SF0123", "sector": "AgriTech", "city": "Pune", "date": "2023-04-25", "amount": 23448744, "stage": "Seed", "investors": 8}, {"id": "SF0079", "sector": "EdTech", "city": "Pune", "date": "2024-12-14", "amount": 14543673, "stage": "Seed", "investors": 10}, {"id": "SF0486", "sector": "E-commerce", "city": "Pune", "date": "2023-03-14", "amount": 13834250, "stage": "Series C", "investors": 6}, {"id": "SF0152", "sector": "HealthTech", "city": "Kolkata", "date": "2023-10-21", "amount": 9786424, "stage": "Series A", "investors": 7}, {"id": "SF0292", "sector": "SaaS", "city": "Ahmedabad", "date": "2024-12-19", "amount": 268164, "stage": "Seed", "investors": 5}, {"id": "SF0164", "sector": "AgriTech", "city": "Mumbai", "date": "2024-03-14", "amount": 9465596, "stage": "Series A", "investors": 4}, {"id": "SF0266", "sector": "HealthTech", "city": "Bengaluru", "date": "2023-12-26", "amount": 33212301, "stage": "Series A", "investors": 3}, {"id": "SF0377", "sector": "AgriTech", "city": "Jaipur", "date": "2024-07-20", "amount": 27055482, "stage": "Series B", "investors": 10}, {"id": "SF0328", "sector": "SaaS", "city": "Chennai", "date": "2023-09-05", "amount": 40952525, "stage": "Series A", "investors": 4}, {"id": "SF0144", "sector": "AgriTech", "city": "Lucknow", "date": "2023-10-15", "amount": 16534885, "stage": "Series C", "investors": 9}, {"id": "SF0387", "sector": "FinTech", "city": "Ahmedabad", "date": "2024-06-21", "amount": 48860716, "stage": "Series B", "investors": 5}, {"id": "SF0304", "sector": "E-commerce", "city": "Bengaluru", "date": "2023-09-29", "amount": 12135962, "stage": "Seed", "investors": 4}, {"id": "SF0200", "sector": "E-commerce", "city": "Bengaluru", "date": "2024-09-19", "amount": 469592, "stage": "Series B", "investors": 6}, {"id": "SF0042", "sector": "E-commerce", "city": "Mumbai", "date": "2023-06-14", "amount": 46488710, "stage": "Series A", "investors": 3}, {"id": "SF0460", "sector": "Unknown", "city": "Mumbai", "date": "2024-05-02", "amount": 3088885, "stage": "Series C", "investors": 10}, {"id": "SF0405", "sector": "HealthTech", "city": "Jaipur", "date": "2023-01-17", "amount": 17936643, "stage": "Seed", "investors": 11}, {"id": "SF0349", "sector": "SaaS", "city": "Pune", "date": "2023-08-05", "amount": 1576380, "stage": "Series B", "investors": 6}, {"id": "SF0232", "sector": "HealthTech", "city": "Kolkata", "date": "2023-12-07", "amount": null, "stage": "Series C", "investors": 3}, {"id": "SF0246", "sector": "E-commerce", "city": "Bengaluru", "date": "2024-01-04", "amount": null, "stage": "Series C", "investors": 9}, {"id": "SF0382", "sector": "SaaS", "city": "Bengaluru", "date": "2024-06-04", "amount": 49006184, "stage": "Series B", "investors": 4}, {"id": "SF0489", "sector": "SaaS", "city": "Kolkata", "date": null, "amount": 21233769, "stage": "Seed", "investors": 10}, {"id": "SF0320", "sector": "E-commerce", "city": "Kolkata", "date": "2023-06-11", "amount": 3533126, "stage": "Series A", "investors": 3}, {"id": "SF0264", "sector": "FinTech", "city": "Hyderabad", "date": "2024-08-31", "amount": 30012675, "stage": "Series B", "investors": 11}, {"id": "SF0030", "sector": "SaaS", "city": "Lucknow", "date": "2023-01-02", "amount": 27807491, "stage": "Series B", "investors": 7}, {"id": "SF0239", "sector": "HealthTech", "city": "Hyderabad", "date": "2024-09-22", "amount": 4259777, "stage": "Series B", "investors": 3}, {"id": "SF0251", "sector": "FinTech", "city": "Delhi", "date": null, "amount": 27558485, "stage": "Series C", "investors": 3}, {"id": "SF0163", "sector": "SaaS", "city": "Jaipur", "date": "2024-03-24", "amount": 17994570, "stage": "Seed", "investors": 10}, {"id": "SF0150", "sector": "E-commerce", "city": "Chennai", "date": "2023-08-26", "amount": 19435067, "stage": "Series C", "investors": 10}, {"id": "SF0383", "sector": "FinTech", "city": "Mumbai", "date": "2024-10-25", "amount": 26710959, "stage": "Series A", "investors": 9}, {"id": "SF0379", "sector": "EdTech", "city": "Jaipur", "date": "2024-12-24", "amount": 1274483, "stage": "Series A", "investors": 5}, {"id": "SF0095", "sector": "SaaS", "city": "Mumbai", "date": "2024-04-27", "amount": 25109623, "stage": "Series B", "investors": 5}, {"id": "SF0222", "sector": "FinTech", "city": "Kolkata", "date": "2023-08-04", "amount": 37590449, "stage": "Seed", "investors": 4}, {"id": "SF0086", "sector": "FinTech", "city": "Bengaluru", "date": "2023-01-08", "amount": 40017635, "stage": "Series C", "investors": 5}, {"id": "SF0188", "sector": "HealthTech", "city": "Pune", "date": "2024-08-24", "amount": 8414041, "stage": "Series A", "investors": 4}, {"id": "SF0090", "sector": "SaaS", "city": "Lucknow", "date": "2023-06-20", "amount": 6756691, "stage": "Series B", "investors": 2}, {"id": "SF0326", "sector": "SaaS", "city": "Lucknow", "date": "2024-12-27", "amount": 42791144, "stage": "Series A", "investors": 4}, {"id": "SF0035", "sector": "AgriTech", "city": "Delhi", "date": "2023-01-02", "amount": 19754102, "stage": "Seed", "investors": 10}, {"id": "SF0218", "sector": "FinTech", "city": "Ahmedabad", "date": "2023-12-20", "amount": 10704802, "stage": "Seed", "investors": 1}, {"id": "SF0073", "sector": "SaaS", "city": "Delhi", "date": "2024-10-23", "amount": 31472141, "stage": "Series B", "investors": 8}, {"id": "SF0221", "sector": "HealthTech", "city": "Pune", "date": "2024-04-03", "amount": 48354475, "stage": "Series A", "investors": 2}, {"id": "SF0463", "sector": "AgriTech", "city": "Jaipur", "date": "2024-04-26", "amount": 3661950, "stage": "Series C", "investors": 9}, {"id": "SF0472", "sector": "E-commerce", "city": "Lucknow", "date": "2023-11-23", "amount": 25174081, "stage": "Series B", "investors": 4}, {"id": "SF0013", "sector": "FinTech", "city": "Jaipur", "date": "2023-04-09", "amount": 44629704, "stage": "Series A", "investors": 7}, {"id": "SF0199", "sector": "E-commerce", "city": "Ahmedabad", "date": "2023-08-18", "amount": 46704304, "stage": "Series A", "investors": 4}, {"id": "SF0214", "sector": "FinTech", "city": "Ahmedabad", "date": "2024-06-18", "amount": 37166083, "stage": "Seed", "investors": 9}, {"id": "SF0445", "sector": "E-commerce", "city": "Ahmedabad", "date": "2024-01-23", "amount": 16456386, "stage": "Series B", "investors": 1}, {"id": "SF0235", "sector": "EdTech", "city": "Ahmedabad", "date": "2024-10-12", "amount": 7418719, "stage": "Series C", "investors": 1}, {"id": "SF0487", "sector": "HealthTech", "city": "Bengaluru", "date": "2023-06-08", "amount": 7758613, "stage": "Series A", "investors": 9}, {"id": "SF0492", "sector": "FinTech", "city": "Ahmedabad", "date": "2023-02-25", "amount": 15198900, "stage": "Series C", "investors": 11}, {"id": "SF0395", "sector": "AgriTech", "city": "Kolkata", "date": "2024-03-20", "amount": 43965081, "stage": "Series B", "investors": 5}, {"id": "SF0097", "sector": "HealthTech", "city": "Kolkata", "date": "2024-10-25", "amount": 15911141, "stage": "Series C", "investors": 10}, {"id": "SF0322", "sector": "AgriTech", "city": "Jaipur", "date": "2023-05-24", "amount": 19879775, "stage": "Series B", "investors": 8}, {"id": "SF0298", "sector": "AgriTech", "city": "Lucknow", "date": "2024-09-15", "amount": 12732763, "stage": "Series A", "investors": 4}, {"id": "SF0064", "sector": "EdTech", "city": "Kolkata", "date": "2023-12-15", "amount": 26111012, "stage": "Series A", "investors": 6}, {"id": "SF0223", "sector": "E-commerce", "city": "Mumbai", "date": "2024-07-24", "amount": 385243680, "stage": "Series B", "investors": 2}, {"id": "SF0096", "sector": "AgriTech", "city": "Ahmedabad", "date": null, "amount": 35287571, "stage": "Series B", "investors": 4}, {"id": "SF0014", "sector": "EdTech", "city": "Mumbai", "date": "2024-11-23", "amount": 48331958, "stage": "Series A", "investors": 6}, {"id": "SF0018", "sector": "EdTech", "city": "Bengaluru", "date": "2023-03-09", "amount": 7807724, "stage": "Series B", "investors": 5}, {"id": "SF0367", "sector": "SaaS", "city": "Jaipur", "date": "2023-05-31", "amount": 17613228, "stage": "Series B", "investors": 8}, {"id": "SF0247", "sector": "AgriTech", "city": "Jaipur", "date": "2023-05-17", "amount": 32328182, "stage": "Seed", "investors": 5}, {"id": "SF0393", "sector": "EdTech", "city": "Chennai", "date": "2024-06-07", "amount": 35893240, "stage": "Seed", "investors": 9}, {"id": "SF0208", "sector": "HealthTech", "city": "Delhi", "date": "2024-03-15", "amount": 25292244, "stage": "Series B", "investors": 6}, {"id": "SF0091", "sector": "SaaS", "city": "Delhi", "date": "2024-01-23", "amount": 18411527, "stage": "Series B", "investors": 7}, {"id": "SF0308", "sector": "EdTech", "city": "Lucknow", "date": "2024-08-05", "amount": null, "stage": "Seed", "investors": 1}, {"id": "SF0335", "sector": "AgriTech", "city": "Pune", "date": "2023-07-12", "amount": 19166486, "stage": "Series A", "investors": 5}, {"id": "SF0365", "sector": "SaaS", "city": "Bengaluru", "date": "2023-12-23", "amount": 31559495, "stage": "Seed", "investors": 10}, {"id": "SF0040", "sector": "E-commerce", "city": "Ahmedabad", "date": "2024-08-14", "amount": 47072319, "stage": "Seed", "investors": 11}, {"id": "SF0087", "sector": "E-commerce", "city": "Lucknow", "date": "2023-08-03", "amount": 32406581, "stage": "Series B", "investors": 6}, {"id": "SF0182", "sector": "SaaS", "city": "Chennai", "date": "2024-03-14", "amount": null, "stage": "Series A", "investors": 1}, {"id": "SF0412", "sector": "HealthTech", "city": "Hyderabad", "date": "2024-05-30", "amount": 21820143, "stage": "Seed", "investors": 7}, {"id": "SF0146", "sector": "E-commerce", "city": "Jaipur", "date": "2024-01-14", "amount": 18296577, "stage": "Series C", "investors": 9}, {"id": "SF0159", "sector": "FinTech", "city": "Jaipur", "date": "2023-05-29", "amount": 16387299, "stage": "Seed", "investors": 6}, {"id": "SF0410", "sector": "E-commerce", "city": "Bengaluru", "date": "2023-01-30", "amount": 34796611, "stage": "Series B", "investors": 11}, {"id": "SF0371", "sector": "EdTech", "city": "Lucknow", "date": "2024-06-19", "amount": 23489303, "stage": "Seed", "investors": 6}, {"id": "SF0372", "sector": "EdTech", "city": "Ahmedabad", "date": "2023-11-27", "amount": 29852335, "stage": "Seed", "investors": 3}, {"id": "SF0355", "sector": "EdTech", "city": "Lucknow", "date": "2023-09-01", "amount": 747418, "stage": "Series C", "investors": 5}, {"id": "SF0201", "sector": "SaaS", "city": "Delhi", "date": "2023-07-27", "amount": 31207628, "stage": "Series C", "investors": 2}, {"id": "SF0293", "sector": "AgriTech", "city": "Lucknow", "date": "2024-09-08", "amount": 47839631, "stage": "Series B", "investors": 1}, {"id": "SF0072", "sector": "E-commerce", "city": "Lucknow", "date": "2024-07-09", "amount": 9487372, "stage": "Seed", "investors": 10}, {"id": "SF0386", "sector": "E-commerce", "city": "Kolkata", "date": "2023-12-30", "amount": 31564853, "stage": "Series B", "investors": 8}, {"id": "SF0421", "sector": "SaaS", "city": "Mumbai", "date": "2023-10-21", "amount": 35826957, "stage": "Series C", "investors": 11}, {"id": "SF0368", "sector": "EdTech", "city": "Chennai", "date": "2024-02-11", "amount": 3956692, "stage": "Series B", "investors": 5}, {"id": "SF0397", "sector": "FinTech", "city": "Chennai", "date": "2024-12-17", "amount": null, "stage": "Series B", "investors": 8}, {"id": "SF0484", "sector": "E-commerce", "city": "Lucknow", "date": "2024-03-21", "amount": 33347666, "stage": "Seed", "investors": 4}, {"id": "SF0469", "sector": "HealthTech", "city": "Pune", "date": "2024-07-04", "amount": 12571676, "stage": "Seed", "investors": 11}, {"id": "SF0392", "sector": "SaaS", "city": "Pune", "date": "2024-08-25", "amount": 19199987, "stage": "Series C", "investors": 7}, {"id": "SF0134", "sector": "SaaS", "city": "Delhi", "date": "2023-05-22", "amount": 6779139, "stage": "Seed", "investors": 6}, {"id": "SF0061", "sector": "HealthTech", "city": "Pune", "date": "2024-03-06", "amount": 25395418, "stage": "Series A", "investors": 8}, {"id": "SF0433", "sector": "EdTech", "city": "Delhi", "date": "2024-08-10", "amount": 31669144, "stage": "Seed", "investors": 1}, {"id": "SF0485", "sector": "HealthTech", "city": "Kolkata", "date": "2024-06-12", "amount": 16482669, "stage": "Seed", "investors": 5}, {"id": "SF0101", "sector": "AgriTech", "city": "Lucknow", "date": null, "amount": 9575375, "stage": "Seed", "investors": 10}, {"id": "SF0020", "sector": "SaaS", "city": "Delhi", "date": "2024-08-27", "amount": 48865214, "stage": "Series A", "investors": 5}, {"id": "SF0389", "sector": "SaaS", "city": "Mumbai", "date": "2023-01-28", "amount": 33805234, "stage": "Seed", "investors": 2}, {"id": "SF0468", "sector": "AgriTech", "city": "Ahmedabad", "date": "2023-09-07", "amount": 35161163, "stage": "Series C", "investors": 2}, {"id": "SF0265", "sector": "HealthTech", "city": "Delhi", "date": "2024-09-23", "amount": 26083265, "stage": "Series B", "investors": 2}, {"id": "SF0277", "sector": "HealthTech", "city": "Ahmedabad", "date": "2023-07-09", "amount": 25638737, "stage": "Series A", "investors": 7}, {"id": "SF0009", "sector": "HealthTech", "city": "Hyderabad", "date": "2024-01-16", "amount": 38339638, "stage": "Series C", "investors": 3}, {"id": "SF0310", "sector": "SaaS", "city": "Delhi", "date": "2023-08-11", "amount": 42473333, "stage": "Series B", "investors": 9}, {"id": "SF0284", "sector": "Unknown", "city": "Jaipur", "date": "2024-04-12", "amount": null, "stage": "Series A", "investors": 8}, {"id": "SF0478", "sector": "E-commerce", "city": "Chennai", "date": "2024-01-22", "amount": 27636953, "stage": "Seed", "investors": 3}, {"id": "SF0093", "sector": "SaaS", "city": "Delhi", "date": "2024-02-17", "amount": 29945414, "stage": "Series A", "investors": 5}, {"id": "SF0253", "sector": "HealthTech", "city": "Hyderabad", "date": "2024-01-21", "amount": 21500529, "stage": "Seed", "investors": 7}, {"id": "SF0033", "sector": "FinTech", "city": "Lucknow", "date": "2024-10-14", "amount": 29129623, "stage": "Seed", "investors": 4}, {"id": "SF0136", "sector": "HealthTech", "city": "Hyderabad", "date": "2024-03-07", "amount": 11533536, "stage": "Seed", "investors": 11}, {"id": "SF0023", "sector": "E-commerce", "city": "Bengaluru", "date": "2024-12-11", "amount": 26324693, "stage": "Series C", "investors": 10}, {"id": "SF0063", "sector": "HealthTech", "city": "Mumbai", "date": "2024-03-09", "amount": 22493634, "stage": "Series C", "investors": 8}, {"id": "SF0490", "sector": "SaaS", "city": "Kolkata", "date": "2023-12-17", "amount": 36680050, "stage": "Seed", "investors": 11}, {"id": "SF0216", "sector": "FinTech", "city": "Lucknow", "date": "2024-06-26", "amount": 42261929, "stage": "Seed", "investors": 2}, {"id": "SF0420", "sector": "FinTech", "city": "Hyderabad", "date": "2023-08-20", "amount": 30983151, "stage": "Series C", "investors": 11}, {"id": "SF0426", "sector": "FinTech", "city": "Delhi", "date": "2024-09-25", "amount": 21263661, "stage": "Series B", "investors": 8}, {"id": "SF0258", "sector": "SaaS", "city": "Mumbai", "date": "2023-02-01", "amount": 44439634, "stage": "Series A", "investors": 11}, {"id": "SF0053", "sector": "FinTech", "city": "Kolkata", "date": "2023-01-11", "amount": 25516798, "stage": "Series A", "investors": 4}, {"id": "SF0416", "sector": "SaaS", "city": "Lucknow", "date": "2024-09-13", "amount": 49142118, "stage": "Series B", "investors": 8}, {"id": "SF0174", "sector": "EdTech", "city": "Hyderabad", "date": "2023-03-04", "amount": 20508252, "stage": "Series A", "investors": 2}, {"id": "SF0036", "sector": "EdTech", "city": "Jaipur", "date": "2023-05-11", "amount": 3953733, "stage": "Series B", "investors": 3}, {"id": "SF0179", "sector": "FinTech", "city": "Pune", "date": "2024-06-22", "amount": 43191890, "stage": "Series A", "investors": 10}, {"id": "SF0168", "sector": "EdTech", "city": "Pune", "date": "2023-06-05", "amount": 25556102, "stage": "Series C", "investors": 5}, {"id": "SF0227", "sector": "HealthTech", "city": "Hyderabad", "date": "2024-01-23", "amount": 45721370, "stage": "Seed", "investors": 2}, {"id": "SF0121", "sector": "E-commerce", "city": "Ahmedabad", "date": "2023-01-19", "amount": 37367641, "stage": "Seed", "investors": 6}, {"id": "SF0276", "sector": "E-commerce", "city": "Chennai", "date": "2024-03-20", "amount": 36570735, "stage": "Series A", "investors": 4}, {"id": "SF0045", "sector": "SaaS", "city": "Pune", "date": "2023-12-11", "amount": 9661072, "stage": "Seed", "investors": 5}, {"id": "SF0301", "sector": "SaaS", "city": "Lucknow", "date": "2024-10-29", "amount": 23513253, "stage": "Series B", "investors": 10}, {"id": "SF0325", "sector": "SaaS", "city": "Lucknow", "date": "2023-02-26", "amount": 7758689, "stage": "Series C", "investors": 1}, {"id": "SF0077", "sector": "FinTech", "city": "Kolkata", "date": "2024-06-07", "amount": 981835, "stage": "Seed", "investors": 6}, {"id": "SF0209", "sector": "HealthTech", "city": "Chennai", "date": "2024-07-21", "amount": 44937144, "stage": "Series C", "investors": 8}, {"id": "SF0369", "sector": "E-commerce", "city": "Lucknow", "date": "2024-11-07", "amount": 18858102, "stage": "Series A", "investors": 3}, {"id": "SF0213", "sector": "FinTech", "city": "Pune", "date": "2024-02-13", "amount": 34831813, "stage": "Series C", "investors": 7}, {"id": "SF0268", "sector": "EdTech", "city": "Kolkata", "date": "2024-07-08", "amount": 46406595, "stage": "Series A", "investors": 8}, {"id": "SF0312", "sector": "EdTech", "city": "Pune", "date": "2024-01-06", "amount": 39681976, "stage": "Seed", "investors": 4}, {"id": "SF0217", "sector": "SaaS", "city": "Lucknow", "date": "2023-06-03", "amount": 47740327, "stage": "Seed", "investors": 4}, {"id": "SF0440", "sector": "FinTech", "city": "Chennai", "date": null, "amount": 30561950, "stage": "Series B", "investors": 1}, {"id": "SF0010", "sector": "HealthTech", "city": "Hyderabad", "date": "2024-12-14", "amount": 10326508, "stage": "Series B", "investors": 4}, {"id": "SF0409", "sector": "FinTech", "city": "Delhi", "date": "2024-09-23", "amount": 38194663, "stage": "Seed", "investors": 3}, {"id": "SF0428", "sector": "EdTech", "city": "Chennai", "date": "2024-02-06", "amount": 39602555, "stage": "Series C", "investors": 7}, {"id": "SF0286", "sector": "SaaS", "city": "Chennai", "date": "2024-07-05", "amount": 27126835, "stage": "Series C", "investors": 2}, {"id": "SF0296", "sector": "SaaS", "city": "Bengaluru", "date": "2024-06-29", "amount": 14349172, "stage": "Series A", "investors": 11}, {"id": "SF0105", "sector": "HealthTech", "city": "Pune", "date": "2024-01-12", "amount": 5472429, "stage": "Series B", "investors": 2}, {"id": "SF0313", "sector": "FinTech", "city": "Bengaluru", "date": "2023-08-09", "amount": 44149748, "stage": "Seed", "investors": 4}, {"id": "SF0439", "sector": "Unknown", "city": "Bengaluru", "date": "2023-06-03", "amount": 41677182, "stage": "Seed", "investors": 9}, {"id": "SF0500", "sector": "AgriTech", "city": "Jaipur", "date": "2024-01-10", "amount": 42297901, "stage": "Series C", "investors": 1}, {"id": "SF0092", "sector": "EdTech", "city": "Bengaluru", "date": "2024-07-20", "amount": 13892132, "stage": "Seed", "investors": null}, {"id": "SF0183", "sector": "SaaS", "city": "Kolkata", "date": "2023-10-07", "amount": 1124930, "stage": "Series A", "investors": 10}, {"id": "SF0316", "sector": "E-commerce", "city": "Delhi", "date": "2023-10-15", "amount": 21963811, "stage": "Series A", "investors": 6}, {"id": "SF0461", "sector": "FinTech", "city": "Ahmedabad", "date": "2024-03-05", "amount": 49653740, "stage": "Series B", "investors": 6}, {"id": "SF0173", "sector": "EdTech", "city": "Chennai", "date": "2023-03-13", "amount": 21461968, "stage": "Series A", "investors": 8}, {"id": "SF0233", "sector": "AgriTech", "city": "Ahmedabad", "date": "2023-02-08", "amount": 12818457, "stage": "Seed", "investors": 11}, {"id": "SF0483", "sector": "EdTech", "city": "Bengaluru", "date": "2023-04-30", "amount": 22749981, "stage": "Seed", "investors": 7}, {"id": "SF0037", "sector": "E-commerce", "city": "Bengaluru", "date": "2023-06-25", "amount": 18298844, "stage": "Series C", "investors": 6}, {"id": "SF0157", "sector": "SaaS", "city": "Mumbai", "date": "2024-03-08", "amount": 49421816, "stage": "Series B", "investors": 5}, {"id": "SF0003", "sector": "Unknown", "city": "Chennai", "date": "2024-06-03", "amount": 43343614, "stage": "Series A", "investors": 9}, {"id": "SF0243", "sector": "HealthTech", "city": "Lucknow", "date": null, "amount": 23039463, "stage": "Series B", "investors": 3}, {"id": "SF0309", "sector": "E-commerce", "city": "Mumbai", "date": "2023-08-22", "amount": 46080345, "stage": "Series A", "investors": 9}, {"id": "SF0290", "sector": "AgriTech", "city": "Lucknow", "date": "2024-12-30", "amount": 14152510, "stage": "Seed", "investors": 5}, {"id": "SF0049", "sector": "HealthTech", "city": "Bengaluru", "date": null, "amount": 11111104, "stage": "Seed", "investors": 4}, {"id": "SF0415", "sector": "E-commerce", "city": "Pune", "date": "2023-12-20", "amount": 1102355, "stage": "Seed", "investors": 9}, {"id": "SF0142", "sector": "Unknown", "city": "Ahmedabad", "date": "2023-01-04", "amount": 32108104, "stage": "Series C", "investors": 7}, {"id": "SF0224", "sector": "EdTech", "city": "Hyderabad", "date": "2024-03-20", "amount": 44110534, "stage": "Series C", "investors": 1}, {"id": "SF0353", "sector": "HealthTech", "city": "Pune", "date": "2023-01-22", "amount": 41907553, "stage": "Series C", "investors": 3}, {"id": "SF0184", "sector": "EdTech", "city": "Pune", "date": "2023-04-26", "amount": 46693556, "stage": "Series C", "investors": 6}, {"id": "SF0332", "sector": "E-commerce", "city": "Delhi", "date": "2024-12-10", "amount": 19297746, "stage": "Seed", "investors": 2}, {"id": "SF0479", "sector": "HealthTech", "city": "Hyderabad", "date": "2024-10-26", "amount": 11598652, "stage": "Series C", "investors": 5}, {"id": "SF0430", "sector": "E-commerce", "city": "Delhi", "date": "2023-03-04", "amount": 2947933, "stage": "Seed", "investors": 8}, {"id": "SF0161", "sector": "HealthTech", "city": "Delhi", "date": "2023-09-17", "amount": 1226641, "stage": "Seed", "investors": 2}, {"id": "SF0337", "sector": "HealthTech", "city": "Delhi", "date": "2023-12-25", "amount": 11417495, "stage": "Series B", "investors": 6}, {"id": "SF0401", "sector": "AgriTech", "city": "Delhi", "date": "2023-10-02", "amount": 23872649, "stage": "Series A", "investors": 6}, {"id": "SF0220", "sector": "E-commerce", "city": "Kolkata", "date": "2023-05-06", "amount": 25961285, "stage": "Series B", "investors": 7}, {"id": "SF0100", "sector": "HealthTech", "city": "Pune", "date": "2024-04-26", "amount": 20237075, "stage": "Series C", "investors": 3}, {"id": "SF0381", "sector": "Unknown", "city": "Kolkata", "date": "2023-08-21", "amount": 20018304, "stage": "Seed", "investors": 5}, {"id": "SF0236", "sector": "FinTech", "city": "Chennai", "date": "2024-09-09", "amount": 16113468, "stage": "Series C", "investors": 1}, {"id": "SF0452", "sector": "FinTech", "city": "Chennai", "date": "2023-01-11", "amount": 29074897, "stage": "Series A", "investors": 11}, {"id": "SF0118", "sector": "HealthTech", "city": "Bengaluru", "date": "2024-03-04", "amount": 10159265, "stage": "Series B", "investors": 11}, {"id": "SF0342", "sector": "EdTech", "city": "Bengaluru", "date": "2024-09-12", "amount": 3956358, "stage": "Series B", "investors": 5}, {"id": "SF0002", "sector": "AgriTech", "city": "Jaipur", "date": "2024-03-19", "amount": 27744177, "stage": "Series A", "investors": 9}, {"id": "SF0114", "sector": "AgriTech", "city": "Bengaluru", "date": "2023-01-05", "amount": 2298411, "stage": "Seed", "investors": 8}, {"id": "SF0464", "sector": "SaaS", "city": "Mumbai", "date": "2024-12-10", "amount": 11452117, "stage": "Series A", "investors": 1}, {"id": "SF0175", "sector": "AgriTech", "city": "Pune", "date": "2023-02-20", "amount": 8866965, "stage": "Seed", "investors": 10}, {"id": "SF0254", "sector": "SaaS", "city": "Lucknow", "date": "2024-06-12", "amount": 9036745, "stage": "Seed", "investors": 3}, {"id": "SF0446", "sector": "SaaS", "city": "Kolkata", "date": "2024-11-22", "amount": 46067543, "stage": "Series A", "investors": 9}, {"id": "SF0185", "sector": "SaaS", "city": "Hyderabad", "date": "2024-10-06", "amount": 41169778, "stage": "Series C", "investors": 5}, {"id": "SF0166", "sector": "E-commerce", "city": "Mumbai", "date": "2023-07-26", "amount": 47581095, "stage": "Series C", "investors": 5}, {"id": "SF0373", "sector": "SaaS", "city": "Hyderabad", "date": "2023-02-05", "amount": 14463667, "stage": "Seed", "investors": 9}, {"id": "SF0275", "sector": "AgriTech", "city": "Jaipur", "date": "2024-10-08", "amount": 43424950, "stage": "Seed", "investors": 1}, {"id": "SF0193", "sector": "EdTech", "city": "Delhi", "date": "2024-09-19", "amount": 9153935, "stage": "Series B", "investors": 2}, {"id": "SF0001", "sector": "SaaS", "city": "Kolkata", "date": "2024-12-06", "amount": 30908948, "stage": "Series B", "investors": 4}, {"id": "SF0055", "sector": "HealthTech", "city": "Bengaluru", "date": "2024-09-12", "amount": 24788298, "stage": "Series C", "investors": 4}, {"id": "SF0376", "sector": "FinTech", "city": "Delhi", "date": "2023-05-24", "amount": 31105903, "stage": "Series B", "investors": 7}, {"id": "SF0029", "sector": "E-commerce", "city": "Bengaluru", "date": "2024-05-04", "amount": 49097798, "stage": "Seed", "investors": 5}, {"id": "SF0207", "sector": "EdTech", "city": "Jaipur", "date": "2024-04-01", "amount": 45536396, "stage": "Series A", "investors": 8}, {"id": "SF0384", "sector": "E-commerce", "city": "Lucknow", "date": "2024-12-30", "amount": 14436241, "stage": "Series C", "investors": 6}, {"id": "SF0494", "sector": "SaaS", "city": "Chennai", "date": "2024-02-17", "amount": 28183276, "stage": "Series A", "investors": 11}, {"id": "SF0050", "sector": "EdTech", "city": "Ahmedabad", "date": "2023-07-20", "amount": 8443607, "stage": "Seed", "investors": 5}, {"id": "SF0351", "sector": "AgriTech", "city": "Delhi", "date": "2024-08-17", "amount": 41248266, "stage": "Series C", "investors": 8}, {"id": "SF0021", "sector": "E-commerce", "city": "Jaipur", "date": "2024-08-07", "amount": 12233774, "stage": "Series B", "investors": 7}, {"id": "SF0294", "sector": "SaaS", "city": "Ahmedabad", "date": "2024-05-08", "amount": 8801417, "stage": "Series C", "investors": 9}, {"id": "SF0177", "sector": "EdTech", "city": "Delhi", "date": "2023-09-19", "amount": 40527013, "stage": "Seed", "investors": 1}, {"id": "SF0336", "sector": "HealthTech", "city": "Hyderabad", "date": "2024-02-03", "amount": 21957017, "stage": "Series B", "investors": 9}, {"id": "SF0380", "sector": "EdTech", "city": "Ahmedabad", "date": "2023-11-03", "amount": 13173425, "stage": "Series B", "investors": 5}, {"id": "SF0034", "sector": "SaaS", "city": "Lucknow", "date": "2023-01-12", "amount": 10784804, "stage": "Series C", "investors": 5}, {"id": "SF0172", "sector": "EdTech", "city": "Ahmedabad", "date": "2024-05-07", "amount": 30679297, "stage": "Series B", "investors": 4}, {"id": "SF0008", "sector": "AgriTech", "city": "Kolkata", "date": "2024-06-07", "amount": 16083689, "stage": "Series B", "investors": 9}, {"id": "SF0319", "sector": "FinTech", "city": "Jaipur", "date": "2024-03-10", "amount": 42029999, "stage": "Series C", "investors": 1}, {"id": "SF0107", "sector": "AgriTech", "city": "Bengaluru", "date": "2023-12-02", "amount": 22048835, "stage": "Seed", "investors": 3}, {"id": "SF0414", "sector": "SaaS", "city": "Jaipur", "date": "2023-08-17", "amount": 33278874, "stage": "Series B", "investors": 8}, {"id": "SF0098", "sector": "HealthTech", "city": "Mumbai", "date": "2024-12-02", "amount": 48535502, "stage": "Seed", "investors": 6}, {"id": "SF0111", "sector": "HealthTech", "city": "Kolkata", "date": "2024-01-31", "amount": 39351120, "stage": "Series A", "investors": 4}, {"id": "SF0361", "sector": "FinTech", "city": "Hyderabad", "date": null, "amount": 14546106, "stage": "Series C", "investors": 3}, {"id": "SF0070", "sector": "EdTech", "city": "Mumbai", "date": "2024-07-07", "amount": 36744676, "stage": "Series B", "investors": 2}, {"id": "SF0347", "sector": "HealthTech", "city": "Ahmedabad", "date": "2024-02-07", "amount": 43827273, "stage": "Series B", "investors": 2}, {"id": "SF0436", "sector": "EdTech", "city": "Chennai", "date": "2024-03-31", "amount": 19679451, "stage": "Seed", "investors": 3}, {"id": "SF0130", "sector": "HealthTech", "city": "Bengaluru", "date": null, "amount": 17682593, "stage": "Series C", "investors": 9}, {"id": "SF0317", "sector": "SaaS", "city": "Mumbai", "date": "2023-02-13", "amount": 22158685, "stage": "Series C", "investors": 2}, {"id": "SF0448", "sector": "E-commerce", "city": "Bengaluru", "date": "2023-11-28", "amount": 33722972, "stage": "Series A", "investors": 5}, {"id": "SF0259", "sector": "SaaS", "city": "Ahmedabad", "date": "2024-11-13", "amount": 26282908, "stage": "Series C", "investors": 11}, {"id": "SF0323", "sector": "AgriTech", "city": "Kolkata", "date": "2024-02-02", "amount": 4434422, "stage": "Series C", "investors": 3}, {"id": "SF0151", "sector": "AgriTech", "city": "Chennai", "date": "2023-11-04", "amount": 30015120, "stage": "Series B", "investors": 10}, {"id": "SF0475", "sector": "E-commerce", "city": "Bengaluru", "date": "2024-01-02", "amount": 43906336, "stage": "Seed", "investors": 4}, {"id": "SF0338", "sector": "FinTech", "city": "Hyderabad", "date": "2023-04-22", "amount": 24729413, "stage": "Series B", "investors": 7}, {"id": "SF0027", "sector": "E-commerce", "city": "Mumbai", "date": "2024-05-19", "amount": 27279953, "stage": "Seed", "investors": 3}, {"id": "SF0399", "sector": "SaaS", "city": "Bengaluru", "date": "2023-06-14", "amount": 8705907, "stage": "Series B", "investors": 1}, {"id": "SF0424", "sector": "SaaS", "city": "Ahmedabad", "date": "2024-01-26", "amount": 43256837, "stage": "Seed", "investors": 5}, {"id": "SF0094", "sector": "AgriTech", "city": "Pune", "date": "2024-05-28", "amount": 6898545, "stage": "Series C", "investors": 3}, {"id": "SF0429", "sector": "FinTech", "city": "Mumbai", "date": "2023-04-13", "amount": 6650877, "stage": "Seed", "investors": 5}, {"id": "SF0149", "sector": "Unknown", "city": "Ahmedabad", "date": "2024-03-30", "amount": 4262999, "stage": "Series B", "investors": 2}, {"id": "SF0481", "sector": "SaaS", "city": "Lucknow", "date": null, "amount": 38792675, "stage": "Series B", "investors": 7}, {"id": "SF0423", "sector": "E-commerce", "city": "Bengaluru", "date": "2023-08-29", "amount": 26283862, "stage": "Seed", "investors": 9}, {"id": "SF0120", "sector": "AgriTech", "city": "Mumbai", "date": "2023-07-30", "amount": 45801572, "stage": "Series C", "investors": 1}, {"id": "SF0406", "sector": "HealthTech", "city": "Lucknow", "date": "2023-12-01", "amount": 8316757, "stage": "Seed", "investors": 4}, {"id": "SF0139", "sector": "FinTech", "city": "Chennai", "date": "2023-09-02", "amount": 35290341, "stage": "Series B", "investors": 4}, {"id": "SF0170", "sector": "E-commerce", "city": "Jaipur", "date": "2024-05-29", "amount": 21588049, "stage": "Series B", "investors": 2}, {"id": "SF0364", "sector": "SaaS", "city": "Kolkata", "date": "2024-07-17", "amount": 30366981, "stage": "Series C", "investors": 3}, {"id": "SF0203", "sector": "EdTech", "city": "Bengaluru", "date": "2024-06-01", "amount": 32126021, "stage": "Series A", "investors": 11}, {"id": "SF0148", "sector": "FinTech", "city": "Pune", "date": "2024-10-21", "amount": 42536646, "stage": "Seed", "investors": 8}, {"id": "SF0278", "sector": "EdTech", "city": "Jaipur", "date": "2024-07-01", "amount": 8098366, "stage": "Series B", "investors": 9}, {"id": "SF0257", "sector": "HealthTech", "city": "Jaipur", "date": "2024-02-18", "amount": 16720747, "stage": "Series C", "investors": 1}, {"id": "SF0457", "sector": "SaaS", "city": "Hyderabad", "date": "2024-04-16", "amount": 48890082, "stage": "Series B", "investors": 2}, {"id": "SF0441", "sector": "HealthTech", "city": "Ahmedabad", "date": "2023-05-25", "amount": 30925810, "stage": "Series B", "investors": 5}, {"id": "SF0132", "sector": "HealthTech", "city": "Chennai", "date": "2023-09-22", "amount": 34851165, "stage": "Series C", "investors": 8}, {"id": "SF0250", "sector": "Unknown", "city": "Hyderabad", "date": "2024-09-10", "amount": null, "stage": "Seed", "investors": 8}, {"id": "SF0153", "sector": "HealthTech", "city": "Pune", "date": "2024-08-06", "amount": 31219191, "stage": "Series C", "investors": 1}, {"id": "SF0363", "sector": "SaaS", "city": "Lucknow", "date": "2024-09-05", "amount": 31673235, "stage": "Seed", "investors": 9}];

const SECTOR_COLORS = {
  'EdTech': '#3DDC97',
  'SaaS': '#4C9EFF',
  'HealthTech': '#F2607A',
  'AgriTech': '#C9A6FF',
  'E-commerce': '#F2B84B',
  'FinTech': '#5EEAD4',
  'Unknown': '#5B6472',
};

const STAGE_ORDER = ['Seed', 'Series A', 'Series B', 'Series C'];
const STAGE_COLORS = {
  'Seed': '#5EEAD4',
  'Series A': '#4C9EFF',
  'Series B': '#F2B84B',
  'Series C': '#F2607A',
};

function fmtUSD(n) {
  if (n == null) return '—';
  if (Math.abs(n) >= 1e9) return '$' + (n / 1e9).toFixed(2) + 'B';
  if (Math.abs(n) >= 1e6) return '$' + (n / 1e6).toFixed(1) + 'M';
  if (Math.abs(n) >= 1e3) return '$' + (n / 1e3).toFixed(0) + 'K';
  return '$' + n;
}

function fmtUSDFull(n) {
  if (n == null) return '—';
  return '$' + n.toLocaleString('en-US');
}

const MONTH_LABELS = {
  '2023-01':'Jan 23','2023-02':'Feb 23','2023-03':'Mar 23','2023-04':'Apr 23',
  '2023-05':'May 23','2023-06':'Jun 23','2023-07':'Jul 23','2023-08':'Aug 23',
  '2023-09':'Sep 23','2023-10':'Oct 23','2023-11':'Nov 23','2023-12':'Dec 23',
  '2024-01':'Jan 24','2024-02':'Feb 24','2024-03':'Mar 24','2024-04':'Apr 24',
  '2024-05':'May 24','2024-06':'Jun 24','2024-07':'Jul 24','2024-08':'Aug 24',
  '2024-09':'Sep 24','2024-10':'Oct 24','2024-11':'Nov 24','2024-12':'Dec 24',
};

function CustomTooltip({ active, payload, label, formatter }) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{
      background: '#171A21',
      border: '1px solid #2A3040',
      borderRadius: 6,
      padding: '8px 12px',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 12,
      color: '#E8EAED',
    }}>
      <div style={{ color: '#8A93A6', marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || p.fill || '#E8EAED' }}>
          {p.name}: {formatter ? formatter(p.value) : p.value}
        </div>
      ))}
    </div>
  );
}

export default function StartupFundDashboard() {
  const [sectorFilter, setSectorFilter] = useState('All');
  const [stageFilter, setStageFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [sortDesc, setSortDesc] = useState(true);

  const sectors = useMemo(() => {
    const s = Array.from(new Set(DEALS.map(d => d.sector))).sort();
    return s;
  }, []);
  const cities = useMemo(() => {
    const s = Array.from(new Set(DEALS.map(d => d.city))).sort();
    return s;
  }, []);

  const filtered = useMemo(() => {
    return DEALS.filter(d => {
      if (sectorFilter !== 'All' && d.sector !== sectorFilter) return false;
      if (stageFilter !== 'All' && d.stage !== stageFilter) return false;
      if (cityFilter !== 'All' && d.city !== cityFilter) return false;
      if (search && !d.id.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [sectorFilter, stageFilter, cityFilter, search]);

  const kpis = useMemo(() => {
    const withAmount = filtered.filter(d => d.amount != null);
    const total = withAmount.reduce((a, d) => a + d.amount, 0);
    const avg = withAmount.length ? total / withAmount.length : 0;
    const withInv = filtered.filter(d => d.investors != null);
    const avgInv = withInv.length ? withInv.reduce((a, d) => a + d.investors, 0) / withInv.length : 0;
    return {
      total,
      count: filtered.length,
      avg,
      avgInv,
      missingAmount: filtered.length - withAmount.length,
    };
  }, [filtered]);

  const bySector = useMemo(() => {
    const map = {};
    filtered.forEach(d => {
      if (d.amount == null) return;
      map[d.sector] = (map[d.sector] || 0) + d.amount;
    });
    return Object.entries(map)
      .map(([sector, amount]) => ({ sector, amount }))
      .sort((a, b) => b.amount - a.amount);
  }, [filtered]);

  const byStage = useMemo(() => {
    const map = {};
    filtered.forEach(d => {
      map[d.stage] = (map[d.stage] || 0) + 1;
    });
    return STAGE_ORDER.filter(s => map[s]).map(stage => ({ stage, count: map[stage] }));
  }, [filtered]);

  const byCity = useMemo(() => {
    const map = {};
    filtered.forEach(d => {
      if (d.amount == null) return;
      map[d.city] = (map[d.city] || 0) + d.amount;
    });
    return Object.entries(map)
      .map(([city, amount]) => ({ city, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 8);
  }, [filtered]);

  const byMonth = useMemo(() => {
    const map = {};
    filtered.forEach(d => {
      if (d.amount == null || !d.date) return;
      const key = d.date.slice(0, 7);
      map[key] = (map[key] || 0) + d.amount;
    });
    return Object.keys(MONTH_LABELS)
      .filter(k => map[k] !== undefined)
      .map(k => ({ month: MONTH_LABELS[k], amount: map[k] }));
  }, [filtered]);

  const tableRows = useMemo(() => {
    const withAmount = filtered.filter(d => d.amount != null);
    const sorted = [...withAmount].sort((a, b) => sortDesc ? b.amount - a.amount : a.amount - b.amount);
    return sorted.slice(0, 12);
  }, [filtered, sortDesc]);

  const tickerDeals = useMemo(() => {
    return [...DEALS.filter(d => d.amount != null)]
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 20);
  }, []);

  return (
    <div style={{
      background: '#0B0D12',
      minHeight: '100vh',
      color: '#E8EAED',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: '28px 24px 48px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { height: 6px; width: 6px; }
        ::-webkit-scrollbar-thumb { background: #2A3040; border-radius: 3px; }
        .chip {
          cursor: pointer;
          border: 1px solid #262C39;
          background: #12151C;
          color: #8A93A6;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.15s ease;
          white-space: nowrap;
        }
        .chip:hover { border-color: #3DDC97; color: #E8EAED; }
        .chip.active { background: #3DDC97; color: #0B0D12; border-color: #3DDC97; font-weight: 600; }
        .ticker-track {
          display: flex;
          gap: 32px;
          animation: scroll-left 40s linear infinite;
          width: max-content;
        }
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ticker-track { animation: none; }
        }
        input:focus, select:focus { outline: 2px solid #3DDC97; outline-offset: 1px; }
        .chip:focus-visible { outline: 2px solid #3DDC97; outline-offset: 1px; }
        table { border-collapse: collapse; width: 100%; }
        th { text-align: left; }
        tbody tr:hover { background: #12151C; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.14em',
          color: '#3DDC97',
          marginBottom: 6,
          textTransform: 'uppercase',
        }}>
          Cleaned Dataset · {DEALS.length} Deals · Jan 2023 – Dec 2024
        </div>
        <h1 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 30,
          fontWeight: 700,
          margin: 0,
          letterSpacing: '-0.01em',
        }}>
          Startup Fund Intelligence
        </h1>
        <div style={{ color: '#8A93A6', fontSize: 13, marginTop: 4 }}>
          Indian startup funding rounds across sectors, cities, and stages
        </div>
      </div>

      {/* Ticker */}
      <div style={{
        border: '1px solid #1F2430',
        background: '#0E1016',
        borderRadius: 8,
        padding: '10px 0',
        marginBottom: 24,
        overflow: 'hidden',
      }}>
        <div className="ticker-track">
          {[...tickerDeals, ...tickerDeals].map((d, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              flexShrink: 0,
            }}>
              <span style={{ color: '#5B6472' }}>{d.id}</span>
              <span style={{
                color: SECTOR_COLORS[d.sector] || '#5B6472',
                fontWeight: 600,
              }}>{d.sector}</span>
              <span style={{ color: '#E8EAED', fontWeight: 600 }}>{fmtUSD(d.amount)}</span>
              <span style={{ color: '#8A93A6' }}>{d.stage}</span>
              <span style={{ color: '#2A3040' }}>•</span>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 14,
        marginBottom: 24,
      }}>
        {[
          { label: 'Total Capital Deployed', value: fmtUSD(kpis.total), sub: fmtUSDFull(kpis.total), color: '#3DDC97' },
          { label: 'Deals in View', value: kpis.count.toLocaleString(), sub: kpis.missingAmount ? kpis.missingAmount + ' missing amount' : 'all amounts present', color: '#4C9EFF' },
          { label: 'Avg Deal Size', value: fmtUSD(kpis.avg), sub: 'per funded deal', color: '#F2B84B' },
          { label: 'Avg Investors / Deal', value: kpis.avgInv.toFixed(1), sub: 'participating investors', color: '#F2607A' },
        ].map((k, i) => (
          <div key={i} style={{
            background: '#12151C',
            border: '1px solid #1F2430',
            borderRadius: 10,
            padding: '16px 18px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: k.color,
            }} />
            <div style={{ color: '#8A93A6', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
              {k.label}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 26, fontWeight: 600, color: '#E8EAED' }}>
              {k.value}
            </div>
            <div style={{ color: '#5B6472', fontSize: 11, marginTop: 4 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center',
        marginBottom: 24,
        paddingBottom: 18,
        borderBottom: '1px solid #1F2430',
      }}>
        <span style={{ color: '#5B6472', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', marginRight: 4 }}>Sector</span>
        <button className={`chip ${sectorFilter === 'All' ? 'active' : ''}`} onClick={() => setSectorFilter('All')}>All</button>
        {sectors.map(s => (
          <button key={s} className={`chip ${sectorFilter === s ? 'active' : ''}`} onClick={() => setSectorFilter(s)}>{s}</button>
        ))}
        <span style={{ width: 1, height: 20, background: '#1F2430', margin: '0 8px' }} />
        <span style={{ color: '#5B6472', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', marginRight: 4 }}>Stage</span>
        <button className={`chip ${stageFilter === 'All' ? 'active' : ''}`} onClick={() => setStageFilter('All')}>All</button>
        {STAGE_ORDER.map(s => (
          <button key={s} className={`chip ${stageFilter === s ? 'active' : ''}`} onClick={() => setStageFilter(s)}>{s}</button>
        ))}
        <span style={{ width: 1, height: 20, background: '#1F2430', margin: '0 8px' }} />
        <select
          value={cityFilter}
          onChange={e => setCityFilter(e.target.value)}
          style={{
            background: '#12151C', color: '#E8EAED', border: '1px solid #262C39',
            borderRadius: 20, padding: '6px 10px', fontSize: 12,
          }}
        >
          <option value="All">All Cities</option>
          {cities.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          placeholder="Search Deal ID…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            background: '#12151C', color: '#E8EAED', border: '1px solid #262C39',
            borderRadius: 20, padding: '6px 12px', fontSize: 12, marginLeft: 'auto', width: 160,
          }}
        />
      </div>

      {/* Charts grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
        gap: 16,
        marginBottom: 16,
      }}>
        {/* Monthly trend */}
        <div style={{ background: '#12151C', border: '1px solid #1F2430', borderRadius: 10, padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Funding Trend</div>
          <div style={{ color: '#5B6472', fontSize: 11, marginBottom: 14 }}>Capital deployed by month</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={byMonth} margin={{ left: -10, right: 8 }}>
              <defs>
                <linearGradient id="fundGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3DDC97" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#3DDC97" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#1A1E28" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#5B6472', fontSize: 10 }} axisLine={{ stroke: '#1F2430' }} tickLine={false} interval={1} />
              <YAxis tick={{ fill: '#5B6472', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={fmtUSD} width={50} />
              <Tooltip content={<CustomTooltip formatter={fmtUSDFull} />} />
              <Area type="monotone" dataKey="amount" name="Funding" stroke="#3DDC97" strokeWidth={2} fill="url(#fundGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Stage donut */}
        <div style={{ background: '#12151C', border: '1px solid #1F2430', borderRadius: 10, padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Deals by Stage</div>
          <div style={{ color: '#5B6472', fontSize: 11, marginBottom: 14 }}>Round-stage mix</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={byStage}
                dataKey="count"
                nameKey="stage"
                innerRadius={55}
                outerRadius={82}
                paddingAngle={2}
              >
                {byStage.map((entry, i) => (
                  <Cell key={i} fill={STAGE_COLORS[entry.stage]} stroke="#0B0D12" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                formatter={(v) => <span style={{ color: '#8A93A6', fontSize: 11 }}>{v}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
        gap: 16,
        marginBottom: 16,
      }}>
        {/* Sector bar */}
        <div style={{ background: '#12151C', border: '1px solid #1F2430', borderRadius: 10, padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Capital by Sector</div>
          <div style={{ color: '#5B6472', fontSize: 11, marginBottom: 14 }}>Total funding, ranked</div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={bySector} layout="vertical" margin={{ left: 6, right: 20 }}>
              <CartesianGrid stroke="#1A1E28" horizontal={false} />
              <XAxis type="number" tick={{ fill: '#5B6472', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={fmtUSD} />
              <YAxis type="category" dataKey="sector" tick={{ fill: '#8A93A6', fontSize: 11 }} axisLine={false} tickLine={false} width={80} />
              <Tooltip content={<CustomTooltip formatter={fmtUSDFull} />} cursor={{ fill: '#1A1E28' }} />
              <Bar dataKey="amount" name="Funding" radius={[0, 4, 4, 0]}>
                {bySector.map((entry, i) => (
                  <Cell key={i} fill={SECTOR_COLORS[entry.sector] || '#5B6472'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* City bar */}
        <div style={{ background: '#12151C', border: '1px solid #1F2430', borderRadius: 10, padding: 18 }}>
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>Top Cities by Capital</div>
          <div style={{ color: '#5B6472', fontSize: 11, marginBottom: 14 }}>Top 8 cities, total funding</div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={byCity} margin={{ left: -10, right: 8 }}>
              <CartesianGrid stroke="#1A1E28" vertical={false} />
              <XAxis dataKey="city" tick={{ fill: '#5B6472', fontSize: 10 }} axisLine={{ stroke: '#1F2430' }} tickLine={false} angle={-20} textAnchor="end" height={50} />
              <YAxis tick={{ fill: '#5B6472', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={fmtUSD} width={50} />
              <Tooltip content={<CustomTooltip formatter={fmtUSDFull} />} cursor={{ fill: '#1A1E28' }} />
              <Bar dataKey="amount" name="Funding" fill="#4C9EFF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#12151C', border: '1px solid #1F2430', borderRadius: 10, padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>Deal Log</div>
            <div style={{ color: '#5B6472', fontSize: 11 }}>Top 12 of {filtered.filter(d => d.amount != null).length} funded deals in view</div>
          </div>
          <button
            className="chip"
            onClick={() => setSortDesc(s => !s)}
          >
            Amount {sortDesc ? '↓' : '↑'}
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
            <thead>
              <tr style={{ color: '#5B6472', borderBottom: '1px solid #1F2430' }}>
                <th style={{ padding: '6px 10px' }}>Deal ID</th>
                <th style={{ padding: '6px 10px' }}>Sector</th>
                <th style={{ padding: '6px 10px' }}>City</th>
                <th style={{ padding: '6px 10px' }}>Stage</th>
                <th style={{ padding: '6px 10px' }}>Date</th>
                <th style={{ padding: '6px 10px' }}>Investors</th>
                <th style={{ padding: '6px 10px', textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((d, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #171A21' }}>
                  <td style={{ padding: '8px 10px', color: '#8A93A6' }}>{d.id}</td>
                  <td style={{ padding: '8px 10px' }}>
                    <span style={{ color: SECTOR_COLORS[d.sector] || '#5B6472', fontWeight: 600 }}>{d.sector}</span>
                  </td>
                  <td style={{ padding: '8px 10px', color: '#E8EAED' }}>{d.city}</td>
                  <td style={{ padding: '8px 10px', color: '#8A93A6' }}>{d.stage}</td>
                  <td style={{ padding: '8px 10px', color: '#5B6472' }}>{d.date || '—'}</td>
                  <td style={{ padding: '8px 10px', color: '#8A93A6' }}>{d.investors ?? '—'}</td>
                  <td style={{ padding: '8px 10px', textAlign: 'right', color: '#E8EAED', fontWeight: 600 }}>{fmtUSDFull(d.amount)}</td>
                </tr>
              ))}
              {tableRows.length === 0 && (
                <tr><td colSpan={7} style={{ padding: 24, textAlign: 'center', color: '#5B6472' }}>No deals match these filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ textAlign: 'center', color: '#3A4152', fontSize: 10, marginTop: 24, fontFamily: "'JetBrains Mono', monospace" }}>
        SanthoshAI · Source: startup_fund_cleaned.xlsx (CleanedData)
      </div>
    </div>
  );
}
