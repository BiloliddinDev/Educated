import { Button } from "@/components/ui/button";
import React from "react";

const Lesson = () => {
  return (
    <div>
      <h1 className="bg-green-500 p-2">Lesson</h1>
      <div className="flex m-2 gap-3">
        <Button>Create Home work</Button>
        <Button>Create Materials</Button>
      </div>
    </div>
  );
};

export default Lesson;
