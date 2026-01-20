import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Filter, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import ChallengeCard from "@/components/dashboard/ChallengeCard";

const categories = [
  { key: "all", label: "All" },
  { key: "transport", label: "Transport" },
  { key: "food", label: "Food" },
  { key: "energy", label: "Energy" },
  { key: "waste", label: "Waste" },
  { key: "water", label: "Water" },
  { key: "shopping", label: "Shopping" }
];

export default function Challenges() {
  const [filter, setFilter] = useState("all");
  const queryClient = useQueryClient();

  const { data: challenges = [], isLoading } = useQuery({
    queryKey: ['challenges'],
    queryFn: () => base44.entities.DailyChallenge.list()
  });

  const { data: userStats } = useQuery({
    queryKey: ['userStats'],
    queryFn: async () => {
      const stats = await base44.entities.UserStats.list();
      return stats[0] || { total_points: 0, total_carbon_saved: 0 };
    }
  });

  const completeChallenge = useMutation({
    mutationFn: async (challenge) => {
      await base44.entities.EcoActivity.create({
        activity_type: challenge.category,
 
