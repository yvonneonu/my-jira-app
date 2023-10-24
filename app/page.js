"use client";

import {
  AddSquare,
  ArrangeHorizontal,
  ArrowLeft,
  Calendar,
  Discover,
  Filter,
  Home2,
  Messenger,
  MoreCircle,
  People,
  SearchNormal1,
  Setting5,
  TaskSquare,
  Timer,
} from "iconsax-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";

const BackLogItems = dynamic(() => import("./components/BackLogItems"), {
  ssr: false,
});

function SidebarItem({ text, icon, index, activeIndex, onClick }) {
  const isActive = index === activeIndex;
  const backgroundStyle = isActive
    ? "bg-blue-600 p-[15px] rounded text-white"
    : "p-[15px]";

  return (
    <div
      className={`flex flex-row justify-between items-center w-[200px] cursor-pointer ${backgroundStyle}`}
      onClick={() => onClick(index)}
    >
      <div className="flex flex-row gap-4">
        {icon}
        <div className="text-[13px] font-normal tracking-tight">{text}</div>
      </div>

      {isActive && <MoreCircle size="15" variant="TwoTone" />}
    </div>
  );
}

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = Array.from(sourceCol.taskIds);

  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);
  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};

export default function Home() {
  const [activeIndex, setActiveIndex] = React.useState(null);

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const [state, setState] = React.useState(initialData);

  const onDragEnd = (result) => {
    console.log("Drag end:", result);

    const { destination, source } = result;

    // Check if the destination is null, indicating the drop was not successful
    if (destination === null) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceCol = state.columns[source.droppableId];
    const destinationCol = state.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );
      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }

    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };
    setState(newState);
  };

  ///position of the drop

  return (
    <>
      <div className="lg:hidden justify-center min-h-screen w-full flex items-center">
        <span className="font-bold leading-10 text-xl">
          please view on desktop instead
        </span>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <main className="inter relative overflow-hidden hidden lg:flex">
          <div className="w-full h-[100vh]">
            <nav className=" w-full h-[10vh] bg-white">
              <div className=" flex flex-row items-center bg-white  border-b-2 border-slate-50">
                <div className="w-[20vw] justify-center flex p-[20px] border-r-2">
                  <Image
                    className="w-full h-full "
                    width={92}
                    height={64}
                    src="/hero.svg"
                  />
                </div>

                <div className="flex flex-row justify-between w-full  bg-white p-[15px] ml-3">
                  <div className="flex flex-row gap-[20px] items-center relative p-[5px] ml-5">
                    <input
                      className="w-[250px] h-8 bg-slate-400 bg-opacity-5 rounded p-[25px] pl-[50px]"
                      placeholder="Search"
                    />
                    <div className="absolute top-[20px] left-[15px]">
                      <SearchNormal1 size="18" color="#8C97AC" />
                    </div>
                    <div className="w-8 h-8 bg-slate-400 bg-opacity-5 rounded flex items-center justify-center ">
                      <Setting5 size="25" color="#8C97AC" />
                    </div>
                    <div className="w-8 h-8 bg-slate-400 bg-opacity-5 rounded flex items-center justify-center ">
                      <Filter size="25" color="#8C97AC" />
                    </div>
                  </div>
                  <div className="p-[5px] mr-5">
                    <AddSquare size="32" color="#2D70FD" />{" "}
                  </div>
                </div>
              </div>
            </nav>

            <div className="flex flex-row border-r-2 p-[20px] lg:p-0  pt-[20px] ">
              <div className="  h-full border-r-2 w-[20.5vw] justify-center flex ">
                <div className="flex justify-center p-[20px]">
                  <div className="flex flex-col gap-[25px] justify-center items-center">
                    <SidebarItem
                      text="Dashboard"
                      icon={<Home2 size="20" />}
                      index={0}
                      activeIndex={activeIndex}
                      onClick={handleItemClick}
                    />
                    <SidebarItem
                      text="Feedback"
                      icon={<Messenger size="20" />}
                      index={1}
                      activeIndex={activeIndex}
                      onClick={handleItemClick}
                    />
                    <SidebarItem
                      text="Task"
                      icon={<TaskSquare size="20" />}
                      index={2}
                      activeIndex={activeIndex}
                      onClick={handleItemClick}
                    />
                    <SidebarItem
                      text="Roadmap"
                      icon={<Discover size="20" />}
                      index={3}
                      activeIndex={activeIndex}
                      onClick={handleItemClick}
                    />
                    <SidebarItem
                      text="Feedback"
                      icon={<ArrangeHorizontal size="20" />}
                      index={4}
                      activeIndex={activeIndex}
                      onClick={handleItemClick}
                    />

                    <div className="flex flex-grow flex-col absolute bottom-0 justify-center items-center gap-[15px] w-[19vw] p-[15px] ">
                      <div className="flex flex-row gap-5 items-center">
                        <div className="w-6 h-6 bg-amber-300 rounded-md flex items-center justify-center ">
                          <div className="text-center text-white text-sm font-medium leading-none tracking-tight">
                            E
                          </div>
                        </div>
                        <div className="text-sky-950 text-[13px] font-normal tracking-tight">
                          Neil Larkins
                        </div>
                      </div>
                      <div className="flex flex-row gap-5 items-center">
                        <div className="w-6 h-6 bg-amber-300 rounded-md flex items-center justify-center ">
                          <div className="text-center text-white text-sm font-medium leading-none tracking-tight">
                            E
                          </div>
                        </div>
                        <div className="text-sky-950 text-[13px] font-normal tracking-tight">
                          Epodpay Inc.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex h-[10vh] justify-between items-center w-full p-[20px]">
                <div className="flex flex-row items-center">
                  <ArrowLeft size="32" color="#405175" />

                  <div className="ml-[25px] flex flex-row gap-[20px] items-center">
                    <div className="flex flex-row gap-2">
                      <Timer size="15" color="#405175" />
                      <div className="text-slate-600 text-[13px] font-light  leading-normal">
                        SPR-06
                      </div>
                    </div>

                    <div className="flex flex-row gap-2 ">
                      <People size="15" color="#2D70FD" />
                      <div className="w-[58px] text-slate-600 text-[13px] font-light  leading-normal">
                        TEAM-10
                      </div>
                    </div>
                    <div className="text-sky-950 text-[13px] font-medium ">
                      New Sprint Name
                    </div>

                    <Calendar size="15" color="#FF8A65" />

                    <People size="15" color="#405175" />

                    <div className="w-[129px] flex items-center justify-center h-8 bg-blue-200 rounded">
                      <div className="text-blue-600 text-[13px] text-center font-medium  tracking-tight">
                        Complete Sprint
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mr-[20px] flex flex-row gap-[10px] items-center">
                  <div className="w-6 h-6  bg-slate-100 rounded">
                    <TaskSquare size="20" color="#8C97AC" />
                  </div>

                  <Image
                    className="w-full h-full "
                    width={92}
                    height={64}
                    src="/Group.svg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className=" h-[450px]  absolute top-[135px] p-[20px] right-[80px] lg:w-[78%]  mt-3 ">
              <div className="  bg-[#F1F4F4] p-[25px] flex  flex-col gap-[25px]">
                <div className=" flex items-center lg:gap-[20px] gap-[30px] flex-col lg:flex-row justify-center">
                  {state.columnOrder.map((columnId) => {
                    const column = state.columns[columnId];
                    const tasks = column.taskIds.map(
                      (taskId) => state.task[taskId]
                    );
                    return (
                      <BackLogItems
                        key={column.id}
                        column={column}
                        tasks={tasks}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>
      </DragDropContext>
    </>
  );
}

const initialData = {
  task: {
    1: {
      id: 1,
      description: "Configure Next.js Application",
      taskNumber: "TSK-01",
      taskStatus: "8",
      icon1: "/Icons.svg",
      icon2: "/chart.svg",
      icon3: "/Ellipse.svg",
    },
    2: {
      id: 2,
      description: "Create SideBar Naviagtion Menu",
      taskNumber: "EPC-02",
      taskStatus: "7",
      icon1: "/Icons.svg",
      icon2: "/chart.svg",
      icon3: "/Ellipse.svg",
    },
    3: {
      id: 3,
      description: "Create Page Layout",
      taskNumber: "EPC-11",
      taskStatus: "13",
      icon1: "/Icons.svg",
      icon2: "/chart.svg",
      icon3: "/Ellipse.svg",
    },
    4: {
      id: 4,
      description: "Create Page Footer",
      taskNumber: "TSK-010",
      taskStatus: "5",
      icon1: "/Icons.svg",
      icon2: "/chart.svg",
      icon3: "/Ellipse.svg",
    },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "BACK-LOG",
      taskIds: [1, 2, 3, 4],
      taskNum: "72",
    },
    "column-2": {
      id: "column-2",
      title: "TO-DO",
      taskIds: [],
      taskNum: "22",
    },
    "column-3": {
      id: "column-3",
      title: "IN-PROGRESS",
      taskIds: [],
      taskNum: "32",
    },
    // "column-4": {
    //   id: "column-4",
    //   title: "DONE",
    //   taskIds: [],
    //   taskNum: "12",
    // },

    // "column-5": {
    //   id: "column-5",
    //   title: "Backlog",
    //   taskIds: [],
    //   taskNum: "42",
    // },
  },

  columnOrder: ["column-1", "column-2", "column-3"],
};
