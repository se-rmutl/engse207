# Draw.io XML Codes for Week 1: Software Architecture

## คำแนะนำการใช้งาน
1. เปิด draw.io หรือ diagrams.net
2. File > Import from > Text
3. คัดลอก XML code ด้านล่างและวาง
4. คลิก Import

---

## Diagram 1: Architecture vs Design vs Implementation Pyramid

```xml
<mxfile host="app.diagrams.net">
  <diagram name="Arch-Design-Impl-Pyramid">
    <mxGraphModel dx="1000" dy="700" grid="1" gridSize="10" guides="1">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Architecture Layer -->
        <mxCell id="arch" value="🏛️ ARCHITECTURE&lt;br&gt;&lt;br&gt;System Structure&lt;br&gt;Components, Patterns&lt;br&gt;Technology Stack" 
                style="shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1;fillColor=#3b82f6;strokeColor=#1e40af;fontSize=16;fontStyle=1;size=40;fontColor=#FFFFFF;" 
                vertex="1" parent="1">
          <mxGeometry x="220" y="100" width="360" height="100" as="geometry"/>
        </mxCell>
        
        <!-- Design Layer -->
        <mxCell id="design" value="📐 DESIGN&lt;br&gt;&lt;br&gt;Module Details&lt;br&gt;Classes, Interfaces&lt;br&gt;Design Patterns" 
                style="shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1;fillColor=#f59e0b;strokeColor=#d97706;fontSize=16;fontStyle=1;size=50;fontColor=#FFFFFF;" 
                vertex="1" parent="1">
          <mxGeometry x="160" y="220" width="480" height="100" as="geometry"/>
        </mxCell>
        
        <!-- Implementation Layer -->
        <mxCell id="impl" value="⚙️ IMPLEMENTATION&lt;br&gt;&lt;br&gt;Code, Tests&lt;br&gt;Functions, Variables&lt;br&gt;Performance Tuning" 
               style="shape=trapezoid;perimeter=trapezoidPerimeter;whiteSpace=wrap;html=1;fillColor=#10b981;strokeColor=#059669;fontSize=16;fontStyle=1;size=60;fontColor=#FFFFFF;" 
               vertex="1" parent="1">
          <mxGeometry x="100" y="340" width="600" height="100" as="geometry"/>
        </mxCell>
        
        <!-- Labels -->
        <mxCell id="label1" value="High-Level&lt;br&gt;Strategic&lt;br&gt;Long-term" 
                style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=12;fontColor=#64748b;" 
                vertex="1" parent="1">
          <mxGeometry x="600" y="120" width="100" height="60" as="geometry"/>
        </mxCell>
        
        <mxCell id="label2" value="Mid-Level&lt;br&gt;Tactical&lt;br&gt;Medium-term" 
                style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=12;fontColor=#64748b;" 
                vertex="1" parent="1">
          <mxGeometry x="660" y="240" width="100" height="60" as="geometry"/>
        </mxCell>
        
        <mxCell id="label3" value="Low-Level&lt;br&gt;Operational&lt;br&gt;Day-to-day" 
                style="text;html=1;strokeColor=none;fillColor=none;align=left;verticalAlign=middle;whiteSpace=wrap;fontSize=12;fontColor=#64748b;" 
                vertex="1" parent="1">
          <mxGeometry x="720" y="360" width="100" height="60" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

## Diagram 2: Netflix High-Level Architecture

```xml
<mxfile host="app.diagrams.net">
  <diagram name="Netflix-Architecture">
    <mxGraphModel dx="1400" dy="900" grid="1" gridSize="10" guides="1">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Users -->
        <mxCell id="users" value="👥 Users Worldwide&lt;br&gt;238M+ Subscribers&lt;br&gt;1B+ hours/week" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fca5a5;strokeColor=#dc2626;fontSize=14;fontStyle=1;fontColor=#7f1d1d;" 
                vertex="1" parent="1">
          <mxGeometry x="450" y="40" width="220" height="80" as="geometry"/>
        </mxCell>
        
        <!-- CDN -->
        <mxCell id="cdn" value="🌐 CDN Layer&lt;br&gt;AWS CloudFront&lt;br&gt;Open Connect CDN&lt;br&gt;Edge Caching" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#7dd3fc;strokeColor=#0284c7;fontSize=13;fontStyle=1;fontColor=#075985;" 
                vertex="1" parent="1">
          <mxGeometry x="420" y="160" width="280" height="90" as="geometry"/>
        </mxCell>
        
        <!-- API Gateway -->
        <mxCell id="gateway" value="🚪 API Gateway&lt;br&gt;Zuul&lt;br&gt;Load Balancing" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fde68a;strokeColor=#f59e0b;fontSize=13;fontStyle=1;fontColor=#78350f;" 
                vertex="1" parent="1">
          <mxGeometry x="450" y="290" width="220" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Microservices Row 1 -->
        <mxCell id="ms1" value="🎬 Video&lt;br&gt;Service" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#86efac;strokeColor=#16a34a;fontSize=12;fontStyle=1;fontColor=#14532d;" 
                vertex="1" parent="1">
          <mxGeometry x="250" y="420" width="130" height="70" as="geometry"/>
        </mxCell>
        
        <mxCell id="ms2" value="👤 User&lt;br&gt;Service" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#86efac;strokeColor=#16a34a;fontSize=12;fontStyle=1;fontColor=#14532d;" 
                vertex="1" parent="1">
          <mxGeometry x="400" y="420" width="130" height="70" as="geometry"/>
        </mxCell>
        
        <mxCell id="ms3" value="🎯 Recommend&lt;br&gt;Service" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#86efac;strokeColor=#16a34a;fontSize=12;fontStyle=1;fontColor=#14532d;" 
                vertex="1" parent="1">
          <mxGeometry x="550" y="420" width="130" height="70" as="geometry"/>
        </mxCell>
        
        <mxCell id="ms4" value="💳 Billing&lt;br&gt;Service" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#86efac;strokeColor=#16a34a;fontSize=12;fontStyle=1;fontColor=#14532d;" 
                vertex="1" parent="1">
          <mxGeometry x="700" y="420" width="130" height="70" as="geometry"/>
        </mxCell>
        
        <!-- Message Bus -->
        <mxCell id="msgbus" value="📨 Message Bus / Event Stream (Kafka)" 
                style="rounded=0;whiteSpace=wrap;html=1;fillColor=#c4b5fd;strokeColor=#7c3aed;fontSize=11;fontStyle=1;fontColor=#4c1d95;" 
                vertex="1" parent="1">
          <mxGeometry x="250" y="520" width="580" height="50" as="geometry"/>
        </mxCell>
        
        <!-- Databases -->
        <mxCell id="db" value="💾 Data Stores&lt;br&gt;Cassandra&lt;br&gt;DynamoDB&lt;br&gt;ElasticSearch" 
                style="shape=cylinder3;whiteSpace=wrap;html=1;boundedLbl=1;backgroundOutline=1;size=15;fillColor=#e9d5ff;strokeColor=#9333ea;fontSize=12;fontStyle=1;fontColor=#581c87;" 
                vertex="1" parent="1">
          <mxGeometry x="460" y="610" width="200" height="100" as="geometry"/>
        </mxCell>
        
        <!-- Arrows -->
        <mxCell id="a1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=3;strokeColor=#3b82f6;endArrow=classic;" 
               edge="1" parent="1" source="users" target="cdn"/>
        <mxCell id="a2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=3;strokeColor=#3b82f6;endArrow=classic;" 
               edge="1" parent="1" source="cdn" target="gateway"/>
        <mxCell id="a3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#64748b;endArrow=classic;" 
               edge="1" parent="1" source="gateway" target="ms1"/>
        <mxCell id="a4" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#64748b;endArrow=classic;" 
               edge="1" parent="1" source="gateway" target="ms2"/>
        <mxCell id="a5" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#64748b;endArrow=classic;" 
               edge="1" parent="1" source="gateway" target="ms3"/>
        <mxCell id="a6" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#64748b;endArrow=classic;" 
               edge="1" parent="1" source="gateway" target="ms4"/>
        <mxCell id="a7" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#9333ea;endArrow=classic;dashed=1;" 
               edge="1" parent="1" source="ms2" target="db"/>
        
        <!-- Note -->
        <mxCell id="note" value="⚡ 700+ Microservices&lt;br&gt;🌍 99.99% Uptime&lt;br&gt;☁️ AWS Cloud Infrastructure" 
                style="shape=note;whiteSpace=wrap;html=1;backgroundOutline=1;fillColor=#fef3c7;strokeColor=#f59e0b;size=15;fontSize=11;fontColor=#78350f;align=left;" 
                vertex="1" parent="1">
          <mxGeometry x="50" y="620" width="180" height="80" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

## Diagram 3: System Context Diagram (C4-C1) - E-Commerce Platform

```xml
<mxfile host="app.diagrams.net">
  <diagram name="C4-Context-Ecommerce">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;System Context Diagram&lt;/b&gt;&lt;br&gt;E-Commerce Platform" 
                style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;fontSize=18;fontStyle=1;fontColor=#1e293b;" 
                vertex="1" parent="1">
          <mxGeometry x="250" y="30" width="400" height="50" as="geometry"/>
        </mxCell>
        
        <!-- Customer (Person) -->
        <mxCell id="customer" value="&lt;b&gt;Customer&lt;/b&gt;&lt;br&gt;[Person]&lt;br&gt;&lt;br&gt;Browses products,&lt;br&gt;makes purchases,&lt;br&gt;tracks orders" 
                style="shape=actor;whiteSpace=wrap;html=1;fillColor=#fca5a5;strokeColor=#dc2626;fontSize=12;fontColor=#7f1d1d;" 
                vertex="1" parent="1">
          <mxGeometry x="80" y="220" width="130" height="150" as="geometry"/>
        </mxCell>
        
        <!-- Admin (Person) -->
        <mxCell id="admin" value="&lt;b&gt;Admin&lt;/b&gt;&lt;br&gt;[Person]&lt;br&gt;&lt;br&gt;Manages products,&lt;br&gt;orders,&lt;br&gt;users" 
                style="shape=actor;whiteSpace=wrap;html=1;fillColor=#fca5a5;strokeColor=#dc2626;fontSize=12;fontColor=#7f1d1d;" 
                vertex="1" parent="1">
          <mxGeometry x="690" y="220" width="130" height="150" as="geometry"/>
        </mxCell>
        
        <!-- E-Commerce System (Main) -->
        <mxCell id="system" value="&lt;b&gt;E-Commerce System&lt;/b&gt;&lt;br&gt;[Software System]&lt;br&gt;&lt;br&gt;Online shopping platform&lt;br&gt;that allows customers to&lt;br&gt;browse and purchase products.&lt;br&gt;Provides admin interface for&lt;br&gt;inventory management." 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#93c5fd;strokeColor=#3b82f6;fontSize=12;align=center;fontColor=#1e3a8a;fontStyle=1;" 
                vertex="1" parent="1">
          <mxGeometry x="300" y="200" width="280" height="190" as="geometry"/>
        </mxCell>
        
        <!-- Email System (External) -->
        <mxCell id="email" value="&lt;b&gt;Email System&lt;/b&gt;&lt;br&gt;[External System]&lt;br&gt;&lt;br&gt;Sends order&lt;br&gt;confirmations,&lt;br&gt;notifications,&lt;br&gt;marketing emails" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e9d5ff;strokeColor=#9333ea;fontSize=11;fontColor=#581c87;" 
                vertex="1" parent="1">
          <mxGeometry x="140" y="480" width="190" height="120" as="geometry"/>
        </mxCell>
        
        <!-- Payment Gateway (External) -->
        <mxCell id="payment" value="&lt;b&gt;Payment Gateway&lt;/b&gt;&lt;br&gt;[External System]&lt;br&gt;&lt;br&gt;Processes credit card&lt;br&gt;and digital wallet&lt;br&gt;payments securely" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e9d5ff;strokeColor=#9333ea;fontSize=11;fontColor=#581c87;" 
                vertex="1" parent="1">
          <mxGeometry x="550" y="480" width="190" height="120" as="geometry"/>
        </mxCell>
        
        <!-- Arrows -->
        <mxCell id="arr1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=3;strokeColor=#3b82f6;endArrow=classic;" 
               edge="1" parent="1" source="customer" target="system">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="arr1_lbl" value="&lt;b&gt;Uses&lt;/b&gt;&lt;br&gt;[HTTPS]" 
                style="edgeLabel;html=1;align=center;verticalAlign=middle;fontSize=11;fontColor=#3b82f6;fontStyle=1;" 
                vertex="1" connectable="0" parent="arr1">
          <mxGeometry x="-0.1" y="2" relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="arr2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=3;strokeColor=#3b82f6;endArrow=classic;" 
               edge="1" parent="1" source="admin" target="system">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="arr2_lbl" value="&lt;b&gt;Manages&lt;/b&gt;&lt;br&gt;[HTTPS]" 
                style="edgeLabel;html=1;align=center;verticalAlign=middle;fontSize=11;fontColor=#3b82f6;fontStyle=1;" 
                vertex="1" connectable="0" parent="arr2">
          <mxGeometry x="-0.1" y="2" relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="arr3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#9333ea;endArrow=classic;dashed=1;" 
               edge="1" parent="1" source="system" target="email">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="arr3_lbl" value="Sends emails using&lt;br&gt;[SMTP/API]" 
                style="edgeLabel;html=1;align=center;verticalAlign=middle;fontSize=10;fontColor=#9333ea;" 
                vertex="1" connectable="0" parent="arr3">
          <mxGeometry x="-0.05" y="1" relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="arr4" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#9333ea;endArrow=classic;dashed=1;" 
               edge="1" parent="1" source="system" target="payment">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        <mxCell id="arr4_lbl" value="Processes payments&lt;br&gt;[REST/HTTPS]" 
                style="edgeLabel;html=1;align=center;verticalAlign=middle;fontSize=10;fontColor=#9333ea;" 
                vertex="1" connectable="0" parent="arr4">
          <mxGeometry x="-0.05" y="1" relative="1" as="geometry"/>
        </mxCell>
        
        <!-- Legend -->
        <mxCell id="legend" value="&lt;b&gt;Legend:&lt;/b&gt; 🧑 Person  |  📦 Our System  |  🔌 External System  |  → Uses  |  ⋯→ Depends on" 
                style="rounded=0;whiteSpace=wrap;html=1;fillColor=#f1f5f9;strokeColor=#cbd5e1;fontSize=10;fontColor=#64748b;align=center;" 
                vertex="1" parent="1">
          <mxGeometry x="80" y="640" width="740" height="40" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

## Diagram 4: Architectural Patterns Comparison

```xml
<mxfile host="app.diagrams.net">
  <diagram name="Patterns-Comparison">
    <mxGraphModel dx="1600" dy="900" grid="1" gridSize="10" guides="1">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Common Architectural Patterns&lt;/b&gt;" 
                style="text;html=1;strokeColor=none;fillColor=none;align=center;fontSize=20;fontStyle=1;fontColor=#1e293b;" 
                vertex="1" parent="1">
          <mxGeometry x="400" y="20" width="600" height="40" as="geometry"/>
        </mxCell>
        
        <!-- MONOLITH -->
        <mxCell id="mono_title" value="&lt;b&gt;1. Monolithic Architecture&lt;/b&gt;" 
                style="text;html=1;strokeColor=none;fillColor=none;fontSize=14;fontStyle=1;fontColor=#3b82f6;" 
                vertex="1" parent="1">
          <mxGeometry x="60" y="80" width="280" height="30" as="geometry"/>
        </mxCell>
        
        <mxCell id="mono_box" value="" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dbeafe;strokeColor=#3b82f6;strokeWidth=3;" 
                vertex="1" parent="1">
          <mxGeometry x="80" y="120" width="240" height="200" as="geometry"/>
        </mxCell>
        
        <mxCell id="mono_ui" value="UI Layer" 
                style="rounded=0;whiteSpace=wrap;html=1;fillColor=#93c5fd;strokeColor=#3b82f6;fontSize=12;fontStyle=1;fontColor=#1e3a8a;" 
                vertex="1" parent="1">
          <mxGeometry x="100" y="140" width="200" height="50" as="geometry"/>
        </mxCell>
        
        <mxCell id="mono_biz" value="Business Logic" 
                style="rounded=0;whiteSpace=wrap;html=1;fillColor=#93c5fd;strokeColor=#3b82f6;fontSize=12;fontStyle=1;fontColor=#1e3a8a;" 
                vertex="1" parent="1">
          <mxGeometry x="100" y="200" width="200" height="50" as="geometry"/>
        </mxCell>
        
        <mxCell id="mono_data" value="Data Access" 
                style="rounded=0;whiteSpace=wrap;html=1;fillColor=#93c5fd;strokeColor=#3b82f6;fontSize=12;fontStyle=1;fontColor=#1e3a8a;" 
                vertex="1" parent="1">
          <mxGeometry x="100" y="260" width="200" height="50" as="geometry"/>
        </mxCell>
        
        <mxCell id="mono_pros" value="✅ Simple&lt;br&gt;✅ Fast to start&lt;br&gt;✅ Easy deployment" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d1fae5;strokeColor=#16a34a;fontSize=11;align=left;fontColor=#14532d;verticalAlign=top;" 
                vertex="1" parent="1">
          <mxGeometry x="80" y="340" width="110" height="80" as="geometry"/>
        </mxCell>
        
        <mxCell id="mono_cons" value="❌ Hard to scale&lt;br&gt;❌ High coupling&lt;br&gt;❌ Long build times" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fecaca;strokeColor=#dc2626;fontSize=11;align=left;fontColor=#7f1d1d;verticalAlign=top;" 
                vertex="1" parent="1">
          <mxGeometry x="210" y="340" width="110" height="80" as="geometry"/>
        </mxCell>
        
        <!-- MICROSERVICES -->
        <mxCell id="micro_title" value="&lt;b&gt;2. Microservices Architecture&lt;/b&gt;" 
                style="text;html=1;strokeColor=none;fillColor=none;fontSize=14;fontStyle=1;fontColor=#0d9488;" 
                vertex="1" parent="1">
          <mxGeometry x="400" y="80" width="280" height="30" as="geometry"/>
        </mxCell>
        
        <mxCell id="ms_gateway" value="API Gateway" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fde68a;strokeColor=#f59e0b;fontSize=12;fontStyle=1;fontColor=#78350f;" 
                vertex="1" parent="1">
          <mxGeometry x="460" y="120" width="160" height="40" as="geometry"/>
        </mxCell>
        
        <mxCell id="ms1_box" value="Service 1&lt;br&gt;+ DB" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#a7f3d0;strokeColor=#0d9488;fontSize=11;fontStyle=1;fontColor=#134e4a;" 
                vertex="1" parent="1">
          <mxGeometry x="410" y="190" width="90" height="70" as="geometry"/>
        </mxCell>
        
        <mxCell id="ms2_box" value="Service 2&lt;br&gt;+ DB" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#a7f3d0;strokeColor=#0d9488;fontSize=11;fontStyle=1;fontColor=#134e4a;" 
                vertex="1" parent="1">
          <mxGeometry x="515" y="190" width="90" height="70" as="geometry"/>
        </mxCell>
        
        <mxCell id="ms3_box" value="Service 3&lt;br&gt;+ DB" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#a7f3d0;strokeColor=#0d9488;fontSize=11;fontStyle=1;fontColor=#134e4a;" 
                vertex="1" parent="1">
          <mxGeometry x="620" y="190" width="90" height="70" as="geometry"/>
        </mxCell>
        
        <mxCell id="ms_bus" value="Message Bus / Event Stream" 
                style="rounded=0;whiteSpace=wrap;html=1;fillColor=#e9d5ff;strokeColor=#9333ea;fontSize=10;fontColor=#581c87;" 
                vertex="1" parent="1">
          <mxGeometry x="410" y="280" width="300" height="40" as="geometry"/>
        </mxCell>
        
        <mxCell id="micro_pros" value="✅ Scale independently&lt;br&gt;✅ Team autonomy&lt;br&gt;✅ Tech flexibility" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d1fae5;strokeColor=#16a34a;fontSize=11;align=left;fontColor=#14532d;verticalAlign=top;" 
                vertex="1" parent="1">
          <mxGeometry x="410" y="340" width="140" height="80" as="geometry"/>
        </mxCell>
        
        <mxCell id="micro_cons" value="❌ Complex ops&lt;br&gt;❌ Network latency&lt;br&gt;❌ Data consistency" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fecaca;strokeColor=#dc2626;fontSize=11;align=left;fontColor=#7f1d1d;verticalAlign=top;" 
                vertex="1" parent="1">
          <mxGeometry x="570" y="340" width="140" height="80" as="geometry"/>
        </mxCell>
        
        <!-- LAYERED -->
        <mxCell id="layer_title" value="&lt;b&gt;3. Layered (N-Tier) Architecture&lt;/b&gt;" 
                style="text;html=1;strokeColor=none;fillColor=none;fontSize=14;fontStyle=1;fontColor=#f59e0b;" 
                vertex="1" parent="1">
          <mxGeometry x="770" y="80" width="300" height="30" as="geometry"/>
        </mxCell>
        
        <mxCell id="layer1" value="Presentation Layer (UI)" 
                style="rounded=0;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#f59e0b;fontSize=11;fontStyle=1;fontColor=#78350f;" 
                vertex="1" parent="1">
          <mxGeometry x="790" y="120" width="260" height="45" as="geometry"/>
        </mxCell>
        
        <mxCell id="layer2" value="Business Logic Layer" 
                style="rounded=0;whiteSpace=wrap;html=1;fillColor=#fed7aa;strokeColor=#ea580c;fontSize=11;fontStyle=1;fontColor=#7c2d12;" 
                vertex="1" parent="1">
          <mxGeometry x="790" y="175" width="260" height="45" as="geometry"/>
        </mxCell>
        
        <mxCell id="layer3" value="Data Access Layer (DAL)" 
                style="rounded=0;whiteSpace=wrap;html=1;fillColor=#fdba74;strokeColor=#dc2626;fontSize=11;fontStyle=1;fontColor=#7c2d12;" 
                vertex="1" parent="1">
          <mxGeometry x="790" y="230" width="260" height="45" as="geometry"/>
        </mxCell>
        
        <mxCell id="layer4" value="Database Layer" 
                style="rounded=0;whiteSpace=wrap;html=1;fillColor=#fb923c;strokeColor=#c2410c;fontSize=11;fontStyle=1;fontColor=#ffffff;" 
                vertex="1" parent="1">
          <mxGeometry x="790" y="285" width="260" height="45" as="geometry"/>
        </mxCell>
        
        <mxCell id="layer_pros" value="✅ Clear separation&lt;br&gt;✅ Easy to understand&lt;br&gt;✅ Good for CRUD" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d1fae5;strokeColor=#16a34a;fontSize=11;align=left;fontColor=#14532d;verticalAlign=top;" 
                vertex="1" parent="1">
          <mxGeometry x="790" y="350" width="120" height="70" as="geometry"/>
        </mxCell>
        
        <mxCell id="layer_cons" value="❌ Performance hit&lt;br&gt;❌ Less flexible&lt;br&gt;❌ Still monolithic" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fecaca;strokeColor=#dc2626;fontSize=11;align=left;fontColor=#7f1d1d;verticalAlign=top;" 
                vertex="1" parent="1">
          <mxGeometry x="930" y="350" width="120" height="70" as="geometry"/>
        </mxCell>
        
        <!-- Summary -->
        <mxCell id="summary" value="💡 Key Insight: ไม่มี Pattern ไหนที่ perfect ทุกด้าน! ต้อง Trade-off ตาม context ของโครงการ" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f1f5f9;strokeColor=#64748b;fontSize=13;fontStyle=2;align=center;fontColor=#1e293b;" 
                vertex="1" parent="1">
          <mxGeometry x="60" y="460" width="990" height="50" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

## Diagram 5: Stakeholders and Their Concerns

```xml
<mxfile host="app.diagrams.net">
  <diagram name="Stakeholders">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Title -->
        <mxCell id="title" value="&lt;b&gt;Software Architecture Stakeholders&lt;/b&gt;" 
                style="text;html=1;strokeColor=none;fillColor=none;align=center;fontSize=20;fontStyle=1;fontColor=#1e293b;" 
                vertex="1" parent="1">
          <mxGeometry x="200" y="30" width="600" height="40" as="geometry"/>
        </mxCell>
        
        <!-- Central Architecture -->
        <mxCell id="arch" value="&lt;b&gt;SOFTWARE&lt;br&gt;ARCHITECTURE&lt;/b&gt;" 
                style="ellipse;whiteSpace=wrap;html=1;fillColor=#3b82f6;strokeColor=#1e40af;fontSize=16;fontStyle=1;fontColor=#ffffff;strokeWidth=4;" 
                vertex="1" parent="1">
          <mxGeometry x="380" y="250" width="240" height="160" as="geometry"/>
        </mxCell>
        
        <!-- Business Stakeholders -->
        <mxCell id="business" value="&lt;b&gt;💼 Business&lt;/b&gt;&lt;br&gt;&lt;br&gt;Concerns:&lt;br&gt;• Time-to-Market&lt;br&gt;• ROI&lt;br&gt;• Cost&lt;br&gt;• Competitive edge" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dbeafe;strokeColor=#3b82f6;fontSize=11;align=left;fontColor=#1e3a8a;" 
                vertex="1" parent="1">
          <mxGeometry x="60" y="100" width="180" height="130" as="geometry"/>
        </mxCell>
        
        <!-- Development Team -->
        <mxCell id="dev" value="&lt;b&gt;👨‍💻 Developers&lt;/b&gt;&lt;br&gt;&lt;br&gt;Concerns:&lt;br&gt;• Modifiability&lt;br&gt;• Testability&lt;br&gt;• Code quality&lt;br&gt;• Developer experience" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d1fae5;strokeColor=#16a34a;fontSize=11;align=left;fontColor=#14532d;" 
                vertex="1" parent="1">
          <mxGeometry x="280" y="80" width="180" height="130" as="geometry"/>
        </mxCell>
        
        <!-- Operations -->
        <mxCell id="ops" value="&lt;b&gt;⚙️ Operations&lt;/b&gt;&lt;br&gt;&lt;br&gt;Concerns:&lt;br&gt;• Deployability&lt;br&gt;• Reliability&lt;br&gt;• Monitorability&lt;br&gt;• Performance" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef3c7;strokeColor=#f59e0b;fontSize=11;align=left;fontColor=#78350f;" 
                vertex="1" parent="1">
          <mxGeometry x="540" y="80" width="180" height="130" as="geometry"/>
        </mxCell>
        
        <!-- End Users -->
        <mxCell id="users" value="&lt;b&gt;👤 End Users&lt;/b&gt;&lt;br&gt;&lt;br&gt;Concerns:&lt;br&gt;• Performance&lt;br&gt;• Usability&lt;br&gt;• Availability&lt;br&gt;• Responsiveness" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fecaca;strokeColor=#dc2626;fontSize=11;align=left;fontColor=#7f1d1d;" 
                vertex="1" parent="1">
          <mxGeometry x="760" y="100" width="180" height="130" as="geometry"/>
        </mxCell>
        
        <!-- Security Team -->
        <mxCell id="security" value="&lt;b&gt;🔒 Security Team&lt;/b&gt;&lt;br&gt;&lt;br&gt;Concerns:&lt;br&gt;• Security&lt;br&gt;• Privacy&lt;br&gt;• Compliance&lt;br&gt;• Audit trails" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#e9d5ff;strokeColor=#9333ea;fontSize=11;align=left;fontColor=#581c87;" 
                vertex="1" parent="1">
          <mxGeometry x="60" y="450" width="180" height="130" as="geometry"/>
        </mxCell>
        
        <!-- Quality Assurance -->
        <mxCell id="qa" value="&lt;b&gt;🧪 QA Team&lt;/b&gt;&lt;br&gt;&lt;br&gt;Concerns:&lt;br&gt;• Testability&lt;br&gt;• Reliability&lt;br&gt;• Quality metrics&lt;br&gt;• Automation" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fce7f3;strokeColor=#ec4899;fontSize=11;align=left;fontColor=#831843;" 
                vertex="1" parent="1">
          <mxGeometry x="280" y="450" width="180" height="130" as="geometry"/>
        </mxCell>
        
        <!-- Product Owners -->
        <mxCell id="product" value="&lt;b&gt;📋 Product Owners&lt;/b&gt;&lt;br&gt;&lt;br&gt;Concerns:&lt;br&gt;• Feature delivery&lt;br&gt;• User value&lt;br&gt;• Roadmap alignment&lt;br&gt;• Stakeholder satisfaction" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ccfbf1;strokeColor=#0d9488;fontSize=11;align=left;fontColor=#134e4a;" 
                vertex="1" parent="1">
          <mxGeometry x="540" y="450" width="180" height="130" as="geometry"/>
        </mxCell>
        
        <!-- Support Team -->
        <mxCell id="support" value="&lt;b&gt;🎧 Support Team&lt;/b&gt;&lt;br&gt;&lt;br&gt;Concerns:&lt;br&gt;• Debuggability&lt;br&gt;• Observability&lt;br&gt;• Error messages&lt;br&gt;• Documentation" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fef9c3;strokeColor=#ca8a04;fontSize=11;align=left;fontColor=#713f12;" 
                vertex="1" parent="1">
          <mxGeometry x="760" y="450" width="180" height="130" as="geometry"/>
        </mxCell>
        
        <!-- Connection Lines -->
        <mxCell id="line1" style="edgeStyle=none;rounded=0;html=1;strokeWidth=2;strokeColor=#cbd5e1;endArrow=none;dashed=1;" 
               edge="1" parent="1" source="business" target="arch"/>
        <mxCell id="line2" style="edgeStyle=none;rounded=0;html=1;strokeWidth=2;strokeColor=#cbd5e1;endArrow=none;dashed=1;" 
               edge="1" parent="1" source="dev" target="arch"/>
        <mxCell id="line3" style="edgeStyle=none;rounded=0;html=1;strokeWidth=2;strokeColor=#cbd5e1;endArrow=none;dashed=1;" 
               edge="1" parent="1" source="ops" target="arch"/>
        <mxCell id="line4" style="edgeStyle=none;rounded=0;html=1;strokeWidth=2;strokeColor=#cbd5e1;endArrow=none;dashed=1;" 
               edge="1" parent="1" source="users" target="arch"/>
        <mxCell id="line5" style="edgeStyle=none;rounded=0;html=1;strokeWidth=2;strokeColor=#cbd5e1;endArrow=none;dashed=1;" 
               edge="1" parent="1" source="security" target="arch"/>
        <mxCell id="line6" style="edgeStyle=none;rounded=0;html=1;strokeWidth=2;strokeColor=#cbd5e1;endArrow=none;dashed=1;" 
               edge="1" parent="1" source="qa" target="arch"/>
        <mxCell id="line7" style="edgeStyle=none;rounded=0;html=1;strokeWidth=2;strokeColor=#cbd5e1;endArrow=none;dashed=1;" 
               edge="1" parent="1" source="product" target="arch"/>
        <mxCell id="line8" style="edgeStyle=none;rounded=0;html=1;strokeWidth=2;strokeColor=#cbd5e1;endArrow=none;dashed=1;" 
               edge="1" parent="1" source="support" target="arch"/>
        
        <!-- Note -->
        <mxCell id="note" value="💡 Architecture ต้องตอบโจทย์ Stakeholders ทุกกลุ่ม แต่ละกลุ่มมีความต้องการที่แตกต่างกัน" 
                style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f1f5f9;strokeColor=#64748b;fontSize=13;fontStyle=2;align=center;fontColor=#1e293b;" 
                vertex="1" parent="1">
          <mxGeometry x="60" y="620" width="880" height="50" as="geometry"/>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

## คำแนะนำเพิ่มเติม

### การปรับแต่ง Diagram:
1. สามารถเปลี่ยนสีได้โดยแก้ค่า `fillColor` และ `strokeColor`
2. ปรับขนาดโดยแก้ค่า `width` และ `height` ใน `<mxGeometry>`
3. เพิ่มรายละเอียดเพิ่มเติมได้โดยเพิ่ม `<mxCell>` ใหม่

### Color Palette ที่ใช้:
- **Primary Blue**: #3b82f6 (Architecture, System)
- **Teal**: #0d9488 (Microservices, Modern)
- **Amber**: #f59e0b (Design, Warnings)
- **Green**: #10b981 (Successes, Implementations)
- **Red**: #dc2626 (Errors, Negatives)
- **Purple**: #9333ea (External Systems, Data)

### Export Options:
- PNG: File > Export as > PNG
- SVG: File > Export as > SVG (สำหรับใส่ในเอกสาร)
- PDF: File > Export as > PDF (สำหรับพิมพ์)
