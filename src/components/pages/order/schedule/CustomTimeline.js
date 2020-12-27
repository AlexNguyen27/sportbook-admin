import React, { useState } from "react";
import moment from "moment";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import { connect } from "react-redux";
import { ORDER_STATUS } from "../../../../utils/common";
import { truncateMultilineString } from "../../../../utils/formatString";
import { Tooltip } from "@material-ui/core";

var keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title",
};

const COLOR = {
  waiting_for_approve: "#bedcfa",
  approved: "#fff3b2",
  paid: "#a8dda8",
  finished: "#cdc9c3",
  cancelled: "#f08a5d",
};

const CustomTimeline = ({ scheduleDisplay, ordersSchedule, selectedDate }) => {
  const groundDisplays = scheduleDisplay.reduce((acc, curr) => {
    const newItem = {
      id: curr.id,
      title: curr.title,
      parent: null,
      rightTitle: curr.title,
      root: true,
      bgColor: "#c6fcae",
    };

    const childs = curr.subGrounds
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((item) => ({
        id: item.id,
        title: item.name,
        parent: curr.id,
        rightTitle: item.name,
        root: false,
        bgColor: "#f4b077",
      }));

    return [...acc, newItem, ...childs];
  }, []);

  const [state, setState] = useState({
    groups: groundDisplays,
    defaultTimeStart: moment(selectedDate).startOf("day").toDate(),
    defaultTimeEnd: moment(selectedDate).startOf("day").add(1, "day").toDate(),
    openGroups: scheduleDisplay.reduce(
      (acc, curr) => ({ ...acc, [curr.id]: true }),
      {}
    ),
  });

  const { groups, defaultTimeStart, defaultTimeEnd, openGroups } = state;

  const toggleGroup = (id) => {
    const { openGroups } = state;
    console.log("d----------------", !openGroups[id]);
    setState({
      ...state,
      openGroups: {
        ...openGroups,
        [id]: !openGroups[id],
      },
    });
  };

  // hide (filter) the groups that are closed, for the rest, patch their "title" and add some callbacks or padding
  const headers = groups
    .filter((g) => g.root || openGroups[g.parent])
    .map((group) => {
      return Object.assign({}, group, {
        title: group.root ? (
          <div
            onClick={() => toggleGroup(group.id)}
            style={{ cursor: "pointer" }}
          >
            <Tooltip title={group.title} placement="left">
              <p>
                {openGroups[group.id] ? "[ - ] " : "[ + ] "}
                {truncateMultilineString(group.title, 25)}
              </p>
            </Tooltip>
          </div>
        ) : (
          <div style={{ paddingLeft: 20 }}>
            <Tooltip title={group.title} placement="left">
              <p>{truncateMultilineString(group.title, 25)}</p>
            </Tooltip>
          </div>
        ),
      });
    });

  // this limits the timeline to -6 months ... +6 months
  const minTime = moment(selectedDate).startOf("day").valueOf();
  const maxTime = moment(selectedDate).endOf("day").valueOf();

  const data = ordersSchedule.map((item) => {
    return {
      id: item.id,
      group: item.subGround.id,
      title:
        ORDER_STATUS[item.status] +
        ` at ${moment(item.updatedAt).format("hh:mm A")}`,
      color: "black",
      bgColor: COLOR[item.status],
      start: Math.floor(
        moment(
          item.startDay + " " + item.startTime,
          "DD/MM/YYYY HH:mm:ss"
        ).valueOf()
      ),
      end: Math.floor(
        moment(
          item.startDay + " " + item.endTime,
          "DD/MM/YYYY HH:mm:ss"
        ).valueOf()
      ),
      className: "",
      tooltip: `From ${item.startTime} to ${item.endTime}`,
      itemProps: {
        "data-tip": `From ${item.startTime} to ${item.endTime}`,
      },
    };
  });

  const itemRenderer = ({
    item,
    timelineContext,
    itemContext,
    getItemProps,
    getResizeProps,
  }) => {
    // const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
    const backgroundColor = itemContext.selected ? "yellow" : item.bgColor;
    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor,
            color: item.color,
            border: `solid 1px ${item.bgColor}`,
          },
          // onMouseDown: () => {
          //   console.log("on item click", item);
          // }
        })}
      >
        {/* {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null} */}
        <div
          style={{
            height: itemContext.dimensions.height,
            overflow: "hidden",
            paddingLeft: 3,
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          <p>{itemContext.title}</p>
        </div>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: "1200px", border: "1px solid #e6e6e6" }}>
      <Timeline
        groups={headers}
        items={data}
        keys={keys}
        sidebarWidth={200}
        minZoom={3 * 60 * 60 * 1000}
        maxZoom={24 * 86400 * 1000}
        lineHeight={50}
        className="over-flow-x-auto"
        minResizeWidth={100}
        canMove
        canResize="right"
        canSelect
        itemsSorted
        itemTouchSendsClick={false}
        stackItems
        dimensions={{
          width: 100,
        }}
        itemHeightRatio={0.75}
        showCursorLine
        onTimeChange={(
          visibleTimeStart,
          visibleTimeEnd,
          updateScrollCanvas
        ) => {
          if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
            updateScrollCanvas(minTime, maxTime);
          } else if (visibleTimeStart < minTime) {
            updateScrollCanvas(
              minTime,
              minTime + (visibleTimeEnd - visibleTimeStart)
            );
          } else if (visibleTimeEnd > maxTime) {
            updateScrollCanvas(
              maxTime - (visibleTimeEnd - visibleTimeStart),
              maxTime
            );
          } else {
            updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
          }
        }}
        itemRenderer={itemRenderer}
        defaultTimeStart={defaultTimeStart}
        defaultTimeEnd={defaultTimeEnd}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  ordersSchedule: state.order.orders_schedule,
  scheduleDisplay: state.ground.scheduleDisplay,
});
export default connect(mapStateToProps, null)(CustomTimeline);
