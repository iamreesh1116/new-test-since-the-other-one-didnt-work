import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Leaf, Flame, Zap, Award } from "lucide-react";
import { toast } from "sonner";

import StatsCard from "@/components/dashboard/StatsCard";
import ChallengeCard from "@/components/dashboard/ChallengeCard";
import ImpactChart from "@/components/dashboard/ImpactChart";
import QuickActions from "@/components/dashboard/QuickActions";
import LogActivityModal from "@/components/activity/LogActivityModal";

const defaultChallenges = [
  { title: "Meatless Monday", description: "Have a plant-based meal today", category: "food", points: 20, carbon_impact: 2.5, difficulty: "easy" },
  { title: "Power Down Hour", description: "Unplug all non-essential electronics for an hour", category: "energy", points: 15, carbon_impact: 0.5, difficulty: "easy" },
  { title: "Zero Waste Walk", description: "Walk instead of driving for a short trip", category: "transport", points: 25, carbon_impact: 2.0, difficulty: "medium" },
  { title: "Plastic-Free Shopping", description: "Do your grocery shopping without single-use plastics", category: "shopping", points: 30, carbon_impact: 1.0, difficulty: "hard" }
];

export default function Home() {
  const [showLogModal, setShowLogModal] = useState(false);
  const [user, setUser] = useState(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => {});
  }, []);

  const { data: activities = [] } = useQuery({
    queryKey: ['activities'],
    queryFn: () => base44.entities.EcoActivity.list('-date', 50)
  });

  const { data: challenges = [] } = useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      const existing = await base44.entities.DailyChallenge.list();
      if (existing.length === 0) {
        await base44.entities.DailyChallenge.bulkCreate(defaultChallenges);
        return defaultChallenges;
 
