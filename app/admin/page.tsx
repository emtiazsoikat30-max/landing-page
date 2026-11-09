"use client";
import { useEffect, useState } from "react";

type Order={id:string;product:string;brand:string;price:number;name:string;phone:string;address:string;createdAt:string;status:string};
const ADMIN_PASSWORD="admin123";

export default function Admin(){
 const [password,setPassword]=useState(""); const [loggedIn,setLoggedIn]=useState(false); const [orders,setOrders]=useState<Order[]>([]); const [error,setError]=useState("");
 useEffect(()=>{setLoggedIn(sessionStorage.getItem("countryside-admin") === "1");setOrders(JSON.parse(localStorage.getItem("countryside-orders")||"[]"));},[]);
 const login=(e:React.FormEvent)=>{e.preventDefault();if(password===ADMIN_PASSWORD){sessionStorage.setItem("countryside-admin","1");setLoggedIn(true);setError("");}else setError("Incorrect admin password")};
 const refresh=()=>setOrders(JSON.parse(localStorage.getItem("countryside-orders")||"[]"));
 const clear=()=>{if(confirm("Delete all saved demo orders?")){localStorage.removeItem("countryside-orders");setOrders([])}};
 if(!loggedIn)return <main className="admin-page"><div className="admin-login"><div className="admin-mark">CB</div><p className="eyebrow blue">COUNTRYSIDE BD</p><h1>Admin panel</h1><p>Sign in to view customer order requests.</p><form onSubmit={login}><label>Admin password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter password" autoFocus/></label>{error&&<small className="admin-error">{error}</small>}<button className="primary" type="submit">Login →</button></form><a href="/">← Back to store</a></div></main>;
 return <main className="admin-page"><div className="admin-shell"><header className="admin-head"><div><p className="eyebrow blue">COUNTRYSIDE BD</p><h1>Order requests</h1></div><div><button className="admin-refresh" onClick={refresh}>Refresh</button><button className="admin-logout" onClick={()=>{sessionStorage.removeItem("countryside-admin");setLoggedIn(false)}}>Log out</button></div></header><div className="admin-stats"><div><b>{orders.length}</b><span>Total orders</span></div><div><b>{orders.filter(o=>o.status==="New").length}</b><span>New requests</span></div></div><section className="orders-panel"><div className="orders-title"><h2>Customer details</h2><button onClick={clear}>Clear demo orders</button></div>{orders.length===0?<div className="admin-empty"><b>No orders yet</b><p>Buy Now requests will appear here.</p></div>:<div className="orders-table">{orders.map(o=><article key={o.id}><div className="order-top"><b>{o.id}</b><span>{new Date(o.createdAt).toLocaleString("en-BD")}</span><em>{o.status}</em></div><h3>{o.product}</h3><strong>৳{o.price.toLocaleString("en-US")}</strong><div className="customer-grid"><span><small>Name</small>{o.name}</span><span><small>Phone</small>{o.phone}</span><span><small>Address</small>{o.address}</span></div></article>)}</div>}</section><a className="admin-back" href="/">← Back to storefront</a></div></main>;
}
