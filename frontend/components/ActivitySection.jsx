import { activities } from "@/lib/data";
import { ArrowRight } from "lucide-react";
import * as motion from "motion/react-client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import Image from "next/image";

export default function ActivitySection() {
  const activityList = activities;
  console.log("activities: ", activities);
  return (
    <section id="aktivitas" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Aktivitas Kami
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-9">
            Berikut adalah beberapa aktivitas terbaru yang telah kami
            selenggarakan untuk sekolah kami.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {activityList.map((activity, index) => (
            <motion.div
              key={activity.id}
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: index * 0.1 }}
            >
              <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-xs py-0">
                <CardHeader className="p-0">
                  <div className="relative">
                    <div className="w-full h-48 relative">
                      <Image
                        fill
                        src={activity.imageUrl}
                        alt={activity.title}
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="absolute top-4 left-4">
                      <Badge
                        variant="secondary"
                        className="bg-background/80 backdrop-blur-xs"
                      >
                        {activity.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-4 text-left">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 mr-2" />
                    {activity.date}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {activity.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {activity.description}
                  </p>
                  <div className="flex items-center text-primary font-medium group-hover:underline">
                    Lainnya{" "}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
