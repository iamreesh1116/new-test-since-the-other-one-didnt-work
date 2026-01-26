import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Bike, Leaf, Zap, Recycle, Droplets, ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const activities = {
  transport: {
    icon: Bike,
    color: "bg-sky-100 text-sky-600 border-sky-200",
    selectedColor: "bg-sky-500 text-white border-sky-500",
    actions: [
      { name: "Biked instead of driving", carbon: 2.5, points: 25 },
      { name: "Took public transit", carbon: 1.5, points: 15 },
      { name: "Walked to destination", carbon: 1.0, points: 20 },
      { name: "Carpooled with others", carbon: 2.0, points: 20 },
      { name: "Used electric vehicle", carbon: 1.8, points: 15 }
    ]
  },
  food: {
    icon: Leaf,
    color: "bg-emerald-100 text-emerald-600 border-emerald-200",
    selectedColor: "bg-emerald-500 text-white border-emerald-500",
    actions: [
      { name: "Had a plant-based meal", carbon: 1.5, points: 15 },
      { name: "Bought local produce", carbon: 0.8, points: 10 },
      { name: "Composted food scraps", carbon: 0.5, points: 10 },
      { name: "Avoided food waste", carbon: 1.2, points: 12 },
      { name: "Grew own vegetables", carbon: 0.6, points: 15 }
    ]
  },
  energy: {
    icon: Zap,
    color: "bg-amber-100 text-amber-600 border-amber-200",
    selectedColor: "bg-amber-500 text-white border-amber-500",
    actions: [
      { name: "Used natural lighting", carbon: 0.3, points: 8 },
      { name: "Air-dried laundry", carbon: 1.0, points: 12 },
      { name: "Unplugged electronics", carbon: 0.4, points: 8 },
      { name: "Adjusted thermostat", carbon: 1.5, points: 15 },
      { name: "Used energy-efficient appliances", carbon: 0.8, points: 10 }
    ]
  },
  waste: {
    icon: Recycle,
    color: "bg-violet-100 text-violet-600 border-violet-200",
    selectedColor: "bg-violet-500 text-white border-violet-500",
    actions: [
      { name: "Recycled properly", carbon: 0.5, points: 10 },
      { name: "Used reusable bags", carbon: 0.3, points: 8 },
      { name: "Refused single-use plastic", carbon: 0.4, points: 10 },
      { name: "Donated items", carbon: 1.0, points: 15 },
      { name: "Repaired instead of replacing", carbon: 2.0, points: 20 }
    ]
  },
  water: {
    icon: Droplets,
    color: "bg-blue-100 text-blue-600 border-blue-200",
    selectedColor: "bg-blue-500 text-white border-blue-500",
    actions: [
      { name: "Took a shorter shower", carbon: 0.4, points: 8 },
      { name: "Fixed a leak", carbon: 1.0, points: 15 },
      { name: "Collected rainwater", carbon: 0.3, points: 10 },
      { name: "Used water-efficient fixtures", carbon: 0.5, points: 12 }
    ]
  },
  shopping: {
    icon: ShoppingBag,
    color: "bg-rose-100 text-rose-600 border-rose-200",
    selectedColor: "bg-rose-500 text-white border-rose-500",
    actions: [
      { name: "Bought secondhand", carbon: 2.5, points: 25 },
      { name: "Chose sustainable brand", carbon: 1.0, points: 12 },
      { name: "Avoided fast fashion", carbon: 2.0, points: 20 },
      { name: "Bought in bulk", carbon: 0.5, points: 8 }
    ]
  }
};

export default function LogActivityModal({ isOpen, onClose, onSubmit }) {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!selectedCategory || !selectedAction) return;
    
    setIsSubmitting(true);
    await onSubmit({
      activity_type: selectedCategory,
      action: selectedAction.name,
      carbon_saved: selectedAction.carbon,
      points_earned: selectedAction.points,
      date: new Date().toISOString().split('T')[0],
      notes
    });
    setIsSubmitting(false);
    handleClose();
  };

  const handleClose = () => {
    setStep(1);
    setSelectedCategory(null);
    setSelectedAction(null);
    setNotes("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-lg bg-white rounded-3xl shadow-2xl z-50 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {step === 1 ? "Log Eco Activity" : "Choose Action"}
                </h2>
                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {step === 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(activities).map(([key, { icon: Icon, color, selectedColor }]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedCategory(key);
                        setStep(2);
                      }}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all",
                        selectedCategory === key ? selectedColor : color,
                        "hover:scale-105"
                      )}
                    >
                      <Icon className="w-8 h-8" />
                      <span className="text-sm font-medium capitalize">{key}</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 2 && selectedCategory && (
                <div className="space-y-3 max-h-[50vh] overflow-y-auto">
                  {activities[selectedCategory].actions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedAction(action)}
                      className={cn(
                        "w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left",
                        selectedAction?.name === action.name
                          ? "border-emerald-500 bg-emerald-50"
                          : "border-gray-100 hover:border-gray-200"
                      )}
                    >
                      <div>
                        <p className="font-medium text-gray-900">{action.name}</p>
                        <p className="text-sm text-gray-500">
                          {action.carbon}kg CO₂ · {action.points} pts
                        </p>
                      </div>
                      {selectedAction?.name === action.name && (
                        <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}

                  {selectedAction && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="pt-4"
                    >
                      <Label className="text-sm text-gray-600">Notes (optional)</Label>
                      <Textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add any details..."
                        className="mt-2 rounded-xl border-gray-200"
                        rows={2}
                      />
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            <div className="border-t border-gray-100 p-4 flex gap-3">
              {step === 2 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep(1);
                    setSelectedAction(null);
                  }}
                  className="flex-1 rounded-xl"
                >
                  Back
                </Button>
              )}
              {step === 2 && (
                <Button
                  onClick={handleSubmit}
                  disabled={!selectedAction || isSubmitting}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl"
                >
                  {isSubmitting ? "Saving..." : "Log Activity"}
                </Button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
