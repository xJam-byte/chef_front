import { observer } from "mobx-react-lite";
import React from "react";
// import chefStore from "../store/ChefStore";
import example from "../assets/images/example.png";

const Restaurants = observer(({ h2_text }) => {
  const objects = [
    {
      name: "Maria La Costo",
      pfp: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dperson&psig=AOvVaw23GQXiB2g_iqVfUSXQmvnk&ust=1725131854846000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDHgI-3nYgDFQAAAAAdAAAAABAE",
    },
    {
      name: "Maria La Costo",
      pfp: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dperson&psig=AOvVaw23GQXiB2g_iqVfUSXQmvnk&ust=1725131854846000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDHgI-3nYgDFQAAAAAdAAAAABAE",
    },
    {
      name: "Maria La Costo",
      pfp: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dperson&psig=AOvVaw23GQXiB2g_iqVfUSXQmvnk&ust=1725131854846000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDHgI-3nYgDFQAAAAAdAAAAABAE",
    },
    {
      name: "Maria La Costo",
      pfp: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dperson&psig=AOvVaw23GQXiB2g_iqVfUSXQmvnk&ust=1725131854846000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDHgI-3nYgDFQAAAAAdAAAAABAE",
    },
    {
      name: "Maria La Costo",
      pfp: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dperson&psig=AOvVaw23GQXiB2g_iqVfUSXQmvnk&ust=1725131854846000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDHgI-3nYgDFQAAAAAdAAAAABAE",
    },
    {
      name: "Maria La Costo",
      pfp: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dperson&psig=AOvVaw23GQXiB2g_iqVfUSXQmvnk&ust=1725131854846000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDHgI-3nYgDFQAAAAAdAAAAABAE",
    },
    {
      name: "Maria La Costo",
      pfp: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Dperson&psig=AOvVaw23GQXiB2g_iqVfUSXQmvnk&ust=1725131854846000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPDHgI-3nYgDFQAAAAAdAAAAABAE",
    },
  ];

  return (
    <section className="restaurants">
      <h2>{h2_text}</h2>
      <div className="list-block">
        {objects.map((o, i) => (
          <div className="rest-block" key={i}>
            <img src={example} alt="chef_picture" />
            {/* <p className="imgbk"></p> */}
            <div className="div">{o.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default Restaurants;
