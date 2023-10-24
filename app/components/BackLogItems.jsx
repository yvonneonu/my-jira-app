import React from "react";
import Image from "next/image";
import { MoreCircle } from "iconsax-react";
import { Droppable, Draggable } from "react-beautiful-dnd";

export default function BackLogItems({ column, tasks }) {
  return (
    <div className="min-w-[350px] bg-white h-[500px] rounded p-4">
      <div>
        <div className="flex flex-row justify-between p-[10px]">
          <div className="flex flex-row items-center gap-[10px]">
            <MoreCircle size="15" variant="TwoTone" color="#F1F4F4" />
            <div className="text-sky-950 text-base font-medium tracking-tight">
              {column.title}
            </div>
          </div>

          <div className="w-6 h-6  bg-blue-600/25 rounded items-center flex justify-center">
            <div className="text-center text-blue-800 text-[13px] font-normal ">
              {column.taskNum}
            </div>
          </div>
        </div>
        <div className="w-full h-[0px] border border-slate-50"></div>
      </div>
      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable
                key={task?.id}
                draggableId={`${task.id}`}
                index={index}
              >
                {(draggableProvided, draggableSnapshot) => {
                  const outlineColor = draggableSnapshot.isDragging
                    ? "#2D313E"
                    : "transparent";

                  const boxShadow = draggableSnapshot.isDragging
                    ? "drop-shadow"
                    : "unset";

                  return (
                    <div
                      className="flex w-full justify-center mt-5"
                      style={{
                        outline: `2px solid ${outlineColor} ${boxShadow}`,
                      }}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      <div className="w-[90%] hover:drop-shadow-lg shadow-sm gap-[16px] flex flex-col bg-white rounded border border-black border-opacity-5 p-[10px]">
                        <div className="w-[218px] text-slate-600 text-[13px] font-medium">
                          {task?.description}
                        </div>

                        <div className="flex flex-row items-center justify-between">
                          <div className="flex flex-row gap-[5px]">
                            <div className="w-4 h-4 rounded">
                              <Image
                                className="w-full h-full"
                                width={92}
                                height={64}
                                src={task?.icon1}
                              />
                            </div>

                            <div className="text-slate-400 text-[13px] font-light leading-normal">
                              {task?.taskNumber}
                            </div>
                          </div>
                          <div className="flex gap-[10px] items-center">
                            <div className="w-4 h-4 rounded">
                              <Image
                                className="w-full h-full"
                                width={92}
                                height={64}
                                src={task?.icon2}
                              />
                            </div>
                            <div className="w-6 h-6 rounded border opacity-10-border-sky-950 flex items-center justify-center">
                              <div className="text-center text-sky-950 text-[13px] font-normal">
                                {task?.taskStatus}
                              </div>
                            </div>

                            <div className="w-6 h-6 rounded-full">
                              <Image
                                className="w-full h-full"
                                width={92}
                                height={64}
                                src={task?.icon3}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </div>
  );
}
