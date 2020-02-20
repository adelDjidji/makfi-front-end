import React, { useState, useEffect } from "react";
import InterventionItem from "./Components/InterventionItem";
import MessageItem from "./Components/MessageItem";
import {
  Breadcrumb,
  Icon,
  PageHeader,
  Menu,
  Dropdown,
  Button,
  Collapse,
  Card,
  List,
  Badge,
  Checkbox,
  Empty
} from "antd";
import moment from "moment";

import "antd/dist/antd.css";
import "./App.css";

moment.locale("fr", {
  months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split(
    "_"
  ),
  monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split(
    "_"
  ),
  monthsParseExact: true,
  weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
  weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
  weekdaysMin: "Di_Lu_Ma_Me_Je_Ve_Sa".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm"
  },
  calendar: {
    sameDay: "[Aujourd’hui à] LT",
    nextDay: "[Demain à] LT",
    nextWeek: "dddd [à] LT",
    lastDay: "[Hier à] LT",
    lastWeek: "dddd [dernier à] LT",
    sameElse: "L"
  },
  relativeTime: {
    future: "dans %s",
    past: "il y a %s",
    s: "quelques secondes",
    m: "une minute",
    mm: "%d minutes",
    h: "une heure",
    hh: "%d heures",
    d: "un jour",
    dd: "%d jours",
    M: "un mois",
    MM: "%d mois",
    y: "un an",
    yy: "%d ans"
  },
  dayOfMonthOrdinalParse: /\d{1,2}(er|e)/,
  ordinal: function(number) {
    return number + (number === 1 ? "er" : "e");
  },
  meridiemParse: /PD|MD/,
  isPM: function(input) {
    return input.charAt(0) === "M";
  },
  // In case the meridiem units are not separated around 12, then implement
  // this function (look at locale/id.js for an example).
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 hour, given meridiem token and hour 1-12 */ ;
  // },
  meridiem: function(hours, minutes, isLower) {
    return hours < 12 ? "PD" : "MD";
  },
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4 // Used to determine first week of the year.
  }
});

const { Panel } = Collapse;
const { Meta } = Card;

//liste des états
const data = [
  {
    status: "success",
    text: "OK",
    active: true
  },
  {
    status: "error",
    text: "Incident",
    active: false
  },
  {
    status: "default",
    text: "Non fait",
    active: false
  }
];
const menu = (
  <Menu>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.alipay.com/"
      >
        Ajouter
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.taobao.com/"
      >
        Modifer
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Supprimer
      </a>
    </Menu.Item>
  </Menu>
);
const DropdownMenu = () => {
  return (
    <Dropdown key="more" overlay={menu}>
      <Button
        style={{
          border: "none",
          padding: 0
        }}
      >
        <Icon
          type="ellipsis"
          style={{
            fontSize: 20,
            verticalAlign: "top"
          }}
        />
      </Button>
    </Dropdown>
  );
};
const listInterventions = [
  {
    id: 1,
    dateTime: "2019-12-11 10:12:00",
    comment: "comment 19 -1",
    active: false,
    status: "error"
  },
  {
    id: 2,
    dateTime: "2019-12-12 12:00:00",
    comment: "comment 19-2",
    active: false,
    status: "success"
  },
  {
    id: 3,
    dateTime: "2020-01-2 12:30:00",
    comment: "comment 2020 -1",
    active: true,
    status: "default"
  },
  {
    id: 4,
    dateTime: "2020-01-4 12:30:00",
    comment: "comment 2020 -2",
    active: false,
    status: "default"
  },
  {
    id: 5,
    dateTime: "2020-01-8 12:30:00",
    comment: "comment 2020 -3",
    active: false,
    status: "error"
  },
  {
    id: 6,
    dateTime: "2020-01-12 11:30:00",
    comment: "comment 2020 -4",
    active: false,
    status: "error"
  },
  {
    id: 7,
    dateTime: "2020-01-22 11:30:00",
    comment: "comment 2020 -5",
    active: false,
    status: "error"
  },
  {
    id: 8,
    dateTime: "2020-02-02 11:30:00",
    comment: "comment 2020 -6",
    active: true,
    status: "success"
  },
  {
    id: 9,
    dateTime: "2020-02-19 11:30:00",
    comment: "comment 2020 -7",
    active: true,
    status: "error"
  }
];
const list2_Interventions = [
  {
    id: 1,
    dateTime: "2020-02-11 10:12:00",
    comment: "Netoyage bien fait.",
    active: true,
    status: "success"
  },
  {
    id: 2,
    dateTime: "2020-01-12 10:00:00",
    comment: "Moyenement propre",
    active: false,
    status: "success"
  },
  {
    id: 3,
    dateTime: "2020-01-22 12:30:00",
    comment: "Bon travail",
    active: true,
    status: "success"
  },
  {
    id: 4,
    dateTime: "2020-01-24 22:30:00",
    comment: "Tres mal fait !!!",
    active: false,
    status: "eror"
  }
];

const YearsOptions = [
  { value: 2020, label: "2020" },
  { value: 2019, label: "2019" }
];
const hotels = [
  {
    id: 1,
    name: "La part-Dieu",
    image:
      "https://pix10.agoda.net/hotelImages/5043346/-1/c489e0e38444ad6e31453efb5d732e7f.jpg?s=1024x768"
  },
  {
    id: 2,
    name: "Hotel Salam",
    image:
      "https://d1rioy1v9s51jr.cloudfront.net/pics/1757/450x270/hotel-icon-7-icon-and-club-36-king-room---city-view_5938.jpg"
  }
];
function App() {
  const [interventions, setinterventions] = useState(listInterventions);
  const [currentHotel, setcurrentHotel] = useState(hotels[0]);

  const onChangeYear = checkedValues => {
    let tmp = listInterventions.filter(item => {
      return checkedValues.find(e => moment(item.dateTime).year() == e);
    });
    setinterventions(tmp);
    console.log("tmp = ", tmp);
    console.log("checked = ", checkedValues);
  };
  //function pour switcher entre les deux Hotels
  const switchHotel = idHotel => {
    switch (idHotel) {
      case 1:
        setinterventions(listInterventions);
        break;
      case 2:
        setinterventions(list2_Interventions);
    }
    setcurrentHotel(hotels.filter(item => item.id == idHotel)[0]);
  };

  //list dropDown des Hotels
  const menuHotels = (
    <Menu>
      {hotels.map(hotel => (
        <Menu.Item onClick={switchHotel.bind(this, hotel.id)}>
          <span>{hotel.name}</span>
        </Menu.Item>
      ))}
    </Menu>
  );
  return (
    <div className="container" style={{ padding: "0 9pt", height: "100%" }}>
      <div className="left-col" style={{ width: "36%" }}>
        <div className="card">
          <Card
            hoverable
            style={{ width: 156, borderRadius: "5pt", margin: "auto" }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Daniéle Lopez" />
          </Card>
        </div>
        <div className="links">
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <Icon type="home" />
              <span>Accueil</span>
            </Breadcrumb.Item>

            <Breadcrumb.Item>Planning</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <List
          size="small"
          header={
            <div>
              <Icon type="swap" /> Etat
            </div>
          }
          bordered
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <Badge status={item.status} />
              {item.text}
            </List.Item>
          )}
        />
      </div>
      <div className="" style={{ width: "60%" }}>
        <h3 className="title-head">
          <Icon type="calendar" theme="filled" /> Planning des interventions
        </h3>
        <div className="table">
          <PageHeader
            style={{
              border: "1px solid rgb(246, 242, 208)"
            }}
            title={
              <span>
                <Icon type="mail" style={{ color: "#bba802" }} />
                Messagerie
              </span>
            }
            extra={[<DropdownMenu key="more" />]}
          />
          <div className="table-body">
            <MessageItem
              title="centrale"
              text="mettre le netoyage de la reception en priorite."
              active={true}
            />
            <MessageItem
              title="reception"
              text="Merci de controler la roubine de la chmbre109 et la chambre a cote aussi bien sur."
              active={true}
            />
            <MessageItem
              title="reception"
              text="Merci de controler la roubine de la chmbre109 et la chambre a cote aussi bien sur."
              danger={true}
            />
          </div>
        </div>
        <hr className="transparent" />
        <div className="table">
          <PageHeader
            style={{
              border: "1px solid rgb(228, 243, 255)"
            }}
            title={
              <span>
                <Icon type="calendar" theme="twoTone" />
                Calendrier des interventions 
              </span>
            }
            extra={[<DropdownMenu key="more" />]}
          />
          <div className="table-body">
            {interventions.map(item => (
              <InterventionItem
                date={`${moment(item.dateTime).format("dddd")} ${moment(
                  item.dateTime
                ).format("DD")}`}
                time={moment(item.dateTime).format("H:m")}
                status={item.status}
                comment={item.comment}
                active={item.active}
              />
            ))}
            {interventions.length == 0 && (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        </div>
      </div>
      <div
        className="right-col"
        style={{ width: "40%", display: "flex", flexDirection: "column" }}
      >
        <div style={{ flex: 1 }}>
          <Dropdown overlay={menuHotels} placement="bottomCenter">
            <Card
              hoverable
              style={{ width: 156, borderRadius: "5pt", margin: "auto" }}
              cover={<img alt="hotel image" src={currentHotel.image} />}
            >
              <Meta
                title={
                  <span>
                    {currentHotel.name} <Icon type="down" />
                  </span>
                }
              />
            </Card>
          </Dropdown>
        </div>
        <div style={{ display: "flex", height: "84%" }}>
          <Collapse
            bordered={false}
            defaultActiveKey={["1"]}
            style={{ alignSelf: "flex-end", flex: 1 }}
          >
            <span className="filtre-title">
              <Icon type="funnel-plot" /> Filtres
            </span>
            <Panel header="Année 2020" key="1">
              <Checkbox.Group
                options={YearsOptions}
                defaultValue={[2020]}
                onChange={onChangeYear}
              />
            </Panel>
            <Panel header="Janvier 2020" key="2">
              <Checkbox>Janvier</Checkbox>
            </Panel>
            <Panel header="Semaine de 19" key="3">
              <Checkbox>Semaine de 19</Checkbox>
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
}

export default App;
