import { Activity } from "@/lib/data";
import * as motion from "motion/react-client";

export default function ActivitySection() {
    const activities = ActivitySection;
    console.log("activities: ", activities);
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center mb-12">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Aktivitas Kami</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Berikut adalah beberapa aktivitas terbaru yang telah kami selenggarakan untuk sekolah kami.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    {activities.map((activity) => (
                        <motion.div>
                            
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
