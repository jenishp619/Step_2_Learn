/**
 *
 * Author: Krutarth Patel
 * Banner ID: B00896235
 * Email: kr653484@dal.ca
 */

import { createContext, useContext, useReducer } from "react";
import axios from "axios";
const RoadmapContext = createContext(null);

const RoadmapDispatchContext = createContext(null);

export function RoadmapProvider({ children }) {
  const [tasks, dispatch] = useReducer(roadmapReducer, RoadmapsData);

  return (
    <RoadmapContext.Provider value={tasks}>
      <RoadmapDispatchContext.Provider value={dispatch}>
        {children}
      </RoadmapDispatchContext.Provider>
    </RoadmapContext.Provider>
  );
}

export function useRoadmap() {
  return useContext(RoadmapContext);
}

export function useRoadmapDispatch() {
  return useContext(RoadmapDispatchContext);
}

function roadmapReducer(roadmapData, action) {
  switch (action.type) {
    case "setTheme": {
      return {
        ...roadmapData,
        SelectedRoadmapData: {
          ...roadmapData.SelectedRoadmapData,
          theme: action.data,
        },
      };
    }
    case "finalizeContent": {
      return {
        ...roadmapData,
        SelectedRoadmapData: {
          ...roadmapData.SelectedRoadmapData,
          data: action.data,
        },
      };
    }

    case "finalizeMetaData": {
      return {
        ...roadmapData,
        SelectedRoadmapData: {
          ...roadmapData.SelectedRoadmapData,
          metaData: action.data,
        },
      };
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const RoadmapsData = {
  availableThemes: [
    {
      id: "default",
      bgImage: "Vector 15 (1).png",
      bgColor: "teal.50",
    },
    {
      id: "greens",
      bgImage: "Group 37.png",
      bgColor: "green.100",
    },
    {
      id: "retro",
      bgImage: "Vector 15 (2).png",
      bgColor: "gray.100",
    },
  ],
  defaultData: [
    {
      content: "this is the first item in the roadmap",
    },
    {
      content: "this is the first item in the roadmap",
    },
    {
      content: "this is the first item in the roadmap",
    },
    {
      content: "this is the second item in the roadmap",
    },
    {
      content:
        "this is the very long item in the roadmap. It is elongated to overflow the box and see the scrolling effect. better than adding lorem ipsome",
    },
    {
      content: "this is the fourth item in the roadmap",
    },
    {
      content:
        "this is the  item that is rendering out of the view in the roadmap. This can help observing the item overflow",
    },
  ],
  SelectedRoadmapData: {
    theme: {
      id: "default",
      bgImage: "Vector 15 (1).png",
      bgColor: "teal.50",
    },
    metaData: {},
    data: [],
  },
};
