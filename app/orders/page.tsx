"use client";
import { useEffect, useState } from "react";
type Order={id:string;product:string;price:number;name:string;phone:string;address:string;createdAt:string;status:string};
export default function Orders(){
 const [orders,setOrders]=useState<Order[]>([]);
 useEffect(()=>setOrders(JSON.parse(localStorage.getItem("countryside-orders")||"[]")),[]);
 const cancel=(id:string)=>{if(!confirm("Cancel this pending order?"))return;const next=orders.map(o=>o.id===id?{...o,status:"Cancelled"}:o);setOrders(next);localStorage.setItem("countryside-orders",JSON.stringify(next))};
 return <main className="orders-page"><div className="orders-shell"><header className="orders-header"><div><p className="eyebrow blue">COUNTRYSIDE BD</p><h1>My orders</h1><p>Track your order request and cancel it while it is pending.</p></div><a href="/">Continue shopping →</a></header>{orders.length===0?<section className="my-orders-empty"><h2>No orders yet</h2><p>Your Buy Now orders will appear here.</p><a href="/">Browse products</a></section>:<section className="my-orders-list">{orders.map(o=><article className={`my-order status-${o.status.toLowerCase()}`} key={o.id}><div className="my-order-top"><span>ORDER · {o.id}</span><em>{o.status}</em></div><div className="my-order-main"><div><h2>{o.product}</h2><b>৳{o.price.toLocaleString("en-US")}</b><p>{o.name} · {o.phone}<br/>{o.address}</p></div><div className="my-order-action">{o.status==="Pending"?<button onClick={()=>cancel(o.id)}>Cancel order</button>:<small>{o.status==="Cancelled"?"This order was cancelled":"Cancellation unavailable after processing"}</small>}</div></div></article>)}</section>}<a className="orders-back" href="/">← Back to storefront</a></div></main>;
}
