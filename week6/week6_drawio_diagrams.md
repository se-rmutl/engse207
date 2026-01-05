# ENGSE207 Week 6: Draw.io XML Diagrams

## รวม Draw.io XML Codes สำหรับ Infographic ประกอบการสอน

---

## Diagram 1: Architectural Design Process Flow

```xml
<mxfile host="app.diagrams.net">
  <diagram name="Architectural-Design-Process">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1200" pageHeight="800">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Title -->
        <mxCell id="title" value="Architectural Design Process" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=24;fontStyle=1;fontColor=#1A237E;" vertex="1" parent="1">
          <mxGeometry x="400" y="30" width="400" height="40" as="geometry"/>
        </mxCell>
        
        <!-- Step 1: Gather Requirements -->
        <mxCell id="step1" value="1️⃣ Gather Requirements&lt;br&gt;&lt;br&gt;📋 Functional Requirements&lt;br&gt;⚡ Non-Functional Requirements&lt;br&gt;💼 Business Goals&lt;br&gt;👥 Stakeholder Interviews" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E8EAF6;strokeColor=#3F51B5;fontSize=14;align=left;verticalAlign=top;fontColor=#1A237E;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="80" y="120" width="260" height="120" as="geometry"/>
        </mxCell>
        
        <!-- Arrow 1 -->
        <mxCell id="arrow1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=3;strokeColor=#3F51B5;endArrow=block;endFill=1;" edge="1" parent="1" source="step1" target="step2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <!-- Step 2: Identify Drivers -->
        <mxCell id="step2" value="2️⃣ Identify Architectural Drivers&lt;br&gt;&lt;br&gt;🎯 Quality Attributes&lt;br&gt;🔒 Constraints&lt;br&gt;💭 Assumptions&lt;br&gt;📊 Priority Ranking" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF9C4;strokeColor=#F9A825;fontSize=14;align=left;verticalAlign=top;fontColor=#F57F17;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="80" y="280" width="260" height="120" as="geometry"/>
        </mxCell>
        
        <!-- Arrow 2 -->
        <mxCell id="arrow2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=3;strokeColor=#F9A825;endArrow=block;endFill=1;" edge="1" parent="1" source="step2" target="step3">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <!-- Step 3: Design Architecture -->
        <mxCell id="step3" value="3️⃣ Design Architecture&lt;br&gt;&lt;br&gt;🏗️ Choose Architectural Styles&lt;br&gt;🧩 Define Components&lt;br&gt;🔗 Design Interfaces&lt;br&gt;🌐 Deployment Architecture" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E1F5FE;strokeColor=#0277BD;fontSize=14;align=left;verticalAlign=top;fontColor=#01579B;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="80" y="440" width="260" height="120" as="geometry"/>
        </mxCell>
        
        <!-- Arrow 3 -->
        <mxCell id="arrow3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=3;strokeColor=#0277BD;endArrow=block;endFill=1;" edge="1" parent="1" source="step3" target="step4">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <!-- Step 4: Evaluate -->
        <mxCell id="step4" value="4️⃣ Evaluate Architecture&lt;br&gt;&lt;br&gt;⚖️ Scenario-based Testing&lt;br&gt;📊 Trade-off Analysis&lt;br&gt;🔬 Prototyping&lt;br&gt;✅ Validation" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E5F5;strokeColor=#7B1FA2;fontSize=14;align=left;verticalAlign=top;fontColor=#4A148C;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="80" y="600" width="260" height="120" as="geometry"/>
        </mxCell>
        
        <!-- Arrow 4 -->
        <mxCell id="arrow4" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=3;strokeColor=#7B1FA2;endArrow=block;endFill=1;" edge="1" parent="1" source="step4" target="step5">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="500" y="660" as="targetPoint"/>
          </mxGeometry>
        </mxCell>
        
        <!-- Step 5: Document -->
        <mxCell id="step5" value="5️⃣ Document Architecture&lt;br&gt;&lt;br&gt;📝 Architecture Decision Records&lt;br&gt;📐 Architecture Diagrams&lt;br&gt;📄 Design Documentation&lt;br&gt;📚 Implementation Guidelines" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E8F5E9;strokeColor=#388E3C;fontSize=14;align=left;verticalAlign=top;fontColor=#1B5E20;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="480" y="600" width="280" height="120" as="geometry"/>
        </mxCell>
        
        <!-- Iteration Arrow -->
        <mxCell id="iteration" value="Iterate 🔄" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#D32F2F;endArrow=block;endFill=1;dashed=1;fontSize=14;fontColor=#D32F2F;fontStyle=1;" edge="1" parent="1">
          <mxGeometry x="-0.2" relative="1" as="geometry">
            <mxPoint x="620" y="600" as="sourcePoint"/>
            <mxPoint x="620" y="240" as="targetPoint"/>
            <mxPoint as="offset"/>
          </mxGeometry>
        </mxCell>
        
        <!-- Success Box -->
        <mxCell id="success" value="✅ Architecture Ready&lt;br&gt;for Implementation!" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#C8E6C9;strokeColor=#388E3C;fontSize=16;fontStyle=1;fontColor=#1B5E20;strokeWidth=3;" vertex="1" parent="1">
          <mxGeometry x="820" y="620" width="280" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Arrow to Success -->
        <mxCell id="arrow5" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=3;strokeColor=#388E3C;endArrow=block;endFill=1;" edge="1" parent="1" source="step5" target="success">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <!-- Side Notes -->
        <mxCell id="note1" value="🎯 Key Insight:&lt;br&gt;ยิ่งตัดสินใจเร็ว&lt;br&gt;ยิ่งเปลี่ยนแปลงง่าย" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFF8E1;strokeColor=#FFA000;fontSize=12;align=center;fontColor=#FF6F00;" vertex="1" parent="1">
          <mxGeometry x="420" y="150" width="140" height="80" as="geometry"/>
        </mxCell>
        
        <mxCell id="note2" value="⚠️ Warning:&lt;br&gt;Design ที่แย่&lt;br&gt;แก้ไขยาก&lt;br&gt;ในภายหลัง" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFEBEE;strokeColor=#E53935;fontSize=12;align=center;fontColor=#C62828;" vertex="1" parent="1">
          <mxGeometry x="420" y="320" width="140" height="80" as="geometry"/>
        </mxCell>
        
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

## Diagram 2: ADD-Lite 5 Steps Process

```xml
<mxfile host="app.diagrams.net">
  <diagram name="ADD-Lite-Process">
    <mxGraphModel dx="1400" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="900">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Title -->
        <mxCell id="title" value="ADD-Lite Methodology: 5 ขั้นตอน" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=28;fontStyle=1;fontColor=#1A237E;" vertex="1" parent="1">
          <mxGeometry x="350" y="30" width="700" height="50" as="geometry"/>
        </mxCell>
        
        <!-- Central Circle -->
        <mxCell id="center" value="ADD-Lite&lt;br&gt;🎯" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#5C6BC0;strokeColor=#1A237E;fontSize=20;fontStyle=1;fontColor=#FFFFFF;strokeWidth=3;" vertex="1" parent="1">
          <mxGeometry x="600" y="350" width="200" height="200" as="geometry"/>
        </mxCell>
        
        <!-- Step 1: Identify Drivers -->
        <mxCell id="step1" value="1️⃣&lt;br&gt;Identify&lt;br&gt;Architectural&lt;br&gt;Drivers" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E8EAF6;strokeColor=#3F51B5;fontSize=16;fontStyle=1;fontColor=#1A237E;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="100" y="100" width="180" height="120" as="geometry"/>
        </mxCell>
        
        <!-- Step 1 Details -->
        <mxCell id="step1detail" value="📋 Requirements&lt;br&gt;⚡ Quality Attributes&lt;br&gt;🔒 Constraints&lt;br&gt;📊 Prioritize" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F5F5F5;strokeColor=#9E9E9E;fontSize=12;align=left;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="100" y="230" width="180" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Step 2: Choose Candidates -->
        <mxCell id="step2" value="2️⃣&lt;br&gt;Choose&lt;br&gt;Candidate&lt;br&gt;Architectures" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFF9C4;strokeColor=#F9A825;fontSize=16;fontStyle=1;fontColor=#F57F17;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="950" y="100" width="180" height="120" as="geometry"/>
        </mxCell>
        
        <!-- Step 2 Details -->
        <mxCell id="step2detail" value="🏗️ Option 1&lt;br&gt;🏗️ Option 2&lt;br&gt;🏗️ (Option 3)&lt;br&gt;📐 Diagrams" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F5F5F5;strokeColor=#9E9E9E;fontSize=12;align=left;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="950" y="230" width="180" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Step 3: Evaluate Trade-offs -->
        <mxCell id="step3" value="3️⃣&lt;br&gt;Evaluate&lt;br&gt;Trade-offs" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E1F5FE;strokeColor=#0277BD;fontSize=16;fontStyle=1;fontColor=#01579B;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="1120" y="400" width="180" height="100" as="geometry"/>
        </mxCell>
        
        <!-- Step 3 Details -->
        <mxCell id="step3detail" value="⚖️ Compare&lt;br&gt;📊 Score&lt;br&gt;💡 Analyze" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F5F5F5;strokeColor=#9E9E9E;fontSize=12;align=left;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="1120" y="510" width="180" height="70" as="geometry"/>
        </mxCell>
        
        <!-- Step 4: Select Primary -->
        <mxCell id="step4" value="4️⃣&lt;br&gt;Select&lt;br&gt;Primary&lt;br&gt;Architecture" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E5F5;strokeColor=#7B1FA2;fontSize=16;fontStyle=1;fontColor=#4A148C;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="950" y="680" width="180" height="120" as="geometry"/>
        </mxCell>
        
        <!-- Step 4 Details -->
        <mxCell id="step4detail" value="✅ Decision&lt;br&gt;📝 Rationale&lt;br&gt;⚠️ Risks" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F5F5F5;strokeColor=#9E9E9E;fontSize=12;align=left;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="950" y="810" width="180" height="70" as="geometry"/>
        </mxCell>
        
        <!-- Step 5: Document (ADR) -->
        <mxCell id="step5" value="5️⃣&lt;br&gt;Document&lt;br&gt;Decision&lt;br&gt;(ADR)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E8F5E9;strokeColor=#388E3C;fontSize=16;fontStyle=1;fontColor=#1B5E20;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="100" y="680" width="180" height="120" as="geometry"/>
        </mxCell>
        
        <!-- Step 5 Details -->
        <mxCell id="step5detail" value="📄 ADR Template&lt;br&gt;🔍 Context&lt;br&gt;💡 Consequences" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F5F5F5;strokeColor=#9E9E9E;fontSize=12;align=left;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="100" y="810" width="180" height="70" as="geometry"/>
        </mxCell>
        
        <!-- Connecting Arrows -->
        <mxCell id="arrow1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=4;strokeColor=#3F51B5;endArrow=block;endFill=1;" edge="1" parent="1" source="step1" target="center">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="arrow2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=4;strokeColor=#F9A825;endArrow=block;endFill=1;" edge="1" parent="1" source="step2" target="center">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="arrow3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=4;strokeColor=#0277BD;endArrow=block;endFill=1;" edge="1" parent="1" source="step3" target="center">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="arrow4" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=4;strokeColor=#7B1FA2;endArrow=block;endFill=1;" edge="1" parent="1" source="step4" target="center">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="arrow5" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=4;strokeColor=#388E3C;endArrow=block;endFill=1;" edge="1" parent="1" source="step5" target="center">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <!-- Circular Flow -->
        <mxCell id="flow" value="Iterative Process 🔄" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=18;fontStyle=1;fontColor=#D32F2F;" vertex="1" parent="1">
          <mxGeometry x="550" y="580" width="300" height="30" as="geometry"/>
        </mxCell>
        
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

## Diagram 3: Quality Attributes to Architectural Patterns Mapping

```xml
<mxfile host="app.diagrams.net">
  <diagram name="QA-to-Patterns">
    <mxGraphModel dx="1600" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1600" pageHeight="1000">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Title -->
        <mxCell id="title" value="Quality Attributes → Architectural Patterns" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=26;fontStyle=1;fontColor=#1A237E;" vertex="1" parent="1">
          <mxGeometry x="400" y="20" width="800" height="50" as="geometry"/>
        </mxCell>
        
        <!-- Left Column: Quality Attributes -->
        
        <!-- Performance -->
        <mxCell id="qa1" value="⚡ Performance" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFCDD2;strokeColor=#D32F2F;fontSize=18;fontStyle=1;fontColor=#B71C1C;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="80" y="100" width="200" height="60" as="geometry"/>
        </mxCell>
        
        <!-- Scalability -->
        <mxCell id="qa2" value="📈 Scalability" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#C5CAE9;strokeColor=#3F51B5;fontSize=18;fontStyle=1;fontColor=#1A237E;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="80" y="200" width="200" height="60" as="geometry"/>
        </mxCell>
        
        <!-- Availability -->
        <mxCell id="qa3" value="🛡️ Availability" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#B2DFDB;strokeColor=#00897B;fontSize=18;fontStyle=1;fontColor=#004D40;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="80" y="300" width="200" height="60" as="geometry"/>
        </mxCell>
        
        <!-- Security -->
        <mxCell id="qa4" value="🔒 Security" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F0F4C3;strokeColor=#AFB42B;fontSize=18;fontStyle=1;fontColor=#827717;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="80" y="400" width="200" height="60" as="geometry"/>
        </mxCell>
        
        <!-- Modifiability -->
        <mxCell id="qa5" value="🔧 Modifiability" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E1BEE7;strokeColor=#8E24AA;fontSize=18;fontStyle=1;fontColor=#4A148C;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="80" y="500" width="200" height="60" as="geometry"/>
        </mxCell>
        
        <!-- Simplicity -->
        <mxCell id="qa6" value="✨ Simplicity" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFECB3;strokeColor=#FFA000;fontSize=18;fontStyle=1;fontColor=#FF6F00;strokeWidth=2;" vertex="1" parent="1">
          <mxGeometry x="80" y="600" width="200" height="60" as="geometry"/>
        </mxCell>
        
        <!-- Right Column: Patterns -->
        
        <!-- Performance Patterns -->
        <mxCell id="pattern1" value="💾 Caching (Redis, CDN)&lt;br&gt;📊 CQRS&lt;br&gt;📖 Read Replicas&lt;br&gt;⚡ Event Sourcing" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFEBEE;strokeColor=#E53935;fontSize=14;align=left;fontColor=#C62828;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="400" y="90" width="280" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Scalability Patterns -->
        <mxCell id="pattern2" value="🌐 Microservices&lt;br&gt;⚖️ Load Balancing&lt;br&gt;🔀 Database Sharding&lt;br&gt;🚀 Horizontal Scaling" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#E8EAF6;strokeColor=#3F51B5;fontSize=14;align=left;fontColor=#1A237E;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="400" y="190" width="280" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Availability Patterns -->
        <mxCell id="pattern3" value="🔄 Redundancy&lt;br&gt;🔁 Failover (Active-Passive)&lt;br&gt;⚡ Circuit Breaker&lt;br&gt;🌍 Multi-region Deployment" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#E0F2F1;strokeColor=#00897B;fontSize=14;align=left;fontColor=#004D40;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="400" y="290" width="280" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Security Patterns -->
        <mxCell id="pattern4" value="🚪 API Gateway&lt;br&gt;🔐 OAuth 2.0 / JWT&lt;br&gt;🛡️ Defense in Depth&lt;br&gt;🔒 Encryption at Rest/Transit" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F9FBE7;strokeColor=#AFB42B;fontSize=14;align=left;fontColor=#827717;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="400" y="390" width="280" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Modifiability Patterns -->
        <mxCell id="pattern5" value="🧩 Microservices&lt;br&gt;📚 Layered Architecture&lt;br&gt;🔌 Plugin Architecture&lt;br&gt;🎛️ Feature Toggles" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F3E5F5;strokeColor=#8E24AA;fontSize=14;align=left;fontColor=#4A148C;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="400" y="490" width="280" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Simplicity Patterns -->
        <mxCell id="pattern6" value="🏢 Monolithic Architecture&lt;br&gt;📊 Layered (MVC)&lt;br&gt;☁️ Serverless (for MVPs)&lt;br&gt;📦 Modular Monolith" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFF8E1;strokeColor=#FFA000;fontSize=14;align=left;fontColor=#FF6F00;strokeWidth=1;" vertex="1" parent="1">
          <mxGeometry x="400" y="590" width="280" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Examples Column -->
        
        <!-- Performance Examples -->
        <mxCell id="example1" value="📱 YouTube&lt;br&gt;🎬 Netflix&lt;br&gt;📘 Facebook" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FCE4EC;strokeColor=#C2185B;fontSize=13;align=center;fontColor=#880E4F;" vertex="1" parent="1">
          <mxGeometry x="800" y="90" width="180" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Scalability Examples -->
        <mxCell id="example2" value="🛍️ Shopee&lt;br&gt;🎵 Spotify&lt;br&gt;🚗 Grab" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#E3F2FD;strokeColor=#1976D2;fontSize=13;align=center;fontColor=#0D47A1;" vertex="1" parent="1">
          <mxGeometry x="800" y="190" width="180" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Availability Examples -->
        <mxCell id="example3" value="🏦 Banking&lt;br&gt;📧 Gmail&lt;br&gt;🏥 Hospital Systems" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#E0F7FA;strokeColor="#00BCD4;" fontSize="13;" align="center;" fontColor="#006064;" vertex="1" parent="1">
          <mxGeometry x="800" y="290" width="180" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Security Examples -->
        <mxCell id="example4" value="🏦 Mobile Banking&lt;br&gt;💳 Payment Gateway&lt;br&gt;🏥 Healthcare Apps" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFDE7;strokeColor=#FBC02D;fontSize=13;align=center;fontColor=#F57F17;" vertex="1" parent="1">
          <mxGeometry x="800" y="390" width="180" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Modifiability Examples -->
        <mxCell id="example5" value="🛒 E-Commerce&lt;br&gt;💻 VS Code&lt;br&gt;🎨 Shopify" style="rounded=0;whiteSpace=wrap;html=1;fillColor="#F8BBD0;" strokeColor="#C2185B;" fontSize="13;" align="center;" fontColor="#880E4F;" vertex="1" parent="1">
          <mxGeometry x="800" y="490" width="180" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Simplicity Examples -->
        <mxCell id="example6" value="🚀 Startup MVPs&lt;br&gt;📝 CRUD Apps&lt;br&gt;🏢 Internal Tools" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFF3E0;strokeColor=#FB8C00;fontSize=13;align=center;fontColor=#E65100;" vertex="1" parent="1">
          <mxGeometry x="800" y="590" width="180" height="80" as="geometry"/>
        </mxCell>
        
        <!-- Column Headers -->
        <mxCell id="header1" value="Quality Attribute" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=16;fontStyle=1;fontColor=#1A237E;" vertex="1" parent="1">
          <mxGeometry x="80" y="60" width="200" height="30" as="geometry"/>
        </mxCell>
        
        <mxCell id="header2" value="Architectural Patterns" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=16;fontStyle=1;fontColor=#1A237E;" vertex="1" parent="1">
          <mxGeometry x="400" y="60" width="280" height="30" as="geometry"/>
        </mxCell>
        
        <mxCell id="header3" value="ตัวอย่างระบบ" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=16;fontStyle=1;fontColor=#1A237E;" vertex="1" parent="1">
          <mxGeometry x="800" y="60" width="180" height="30" as="geometry"/>
        </mxCell>
        
        <!-- Connecting Lines -->
        <mxCell id="line1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#D32F2F;endArrow=none;endFill=0;" edge="1" parent="1" source="qa1" target="pattern1">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="line2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#3F51B5;endArrow=none;endFill=0;" edge="1" parent="1" source="qa2" target="pattern2">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="line3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#00897B;endArrow=none;endFill=0;" edge="1" parent="1" source="qa3" target="pattern3">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="line4" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#AFB42B;endArrow=none;endFill=0;" edge="1" parent="1" source="qa4" target="pattern4">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="line5" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#8E24AA;endArrow=none;endFill=0;" edge="1" parent="1" source="qa5" target="pattern5">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <mxCell id="line6" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#FFA000;endArrow=none;endFill=0;" edge="1" parent="1" source="qa6" target="pattern6">
          <mxGeometry relative="1" as="geometry"/>
        </mxCell>
        
        <!-- Bottom Note -->
        <mxCell id="note" value="💡 คำแนะนำ: Pattern เดียวกันสามารถตอบโจทย์ Quality Attributes หลายตัวได้ เช่น Microservices รองรับทั้ง Scalability และ Modifiability" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFF9C4;strokeColor=#F9A825;fontSize=14;align=center;fontColor=#F57F17;fontStyle=2;" vertex="1" parent="1">
          <mxGeometry x="80" y="720" width="900" height="60" as="geometry"/>
        </mxCell>
        
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

## Diagram 4: Candidate Architectures Comparison (Task Board System)

```xml
<mxfile host="app.diagrams.net">
  <diagram name="Candidate-Comparison">
    <mxGraphModel dx="1800" dy="1100" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1800" pageHeight="1100">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Title -->
        <mxCell id="title" value="Candidate Architectures Comparison: Task Board System" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=26;fontStyle=1;fontColor=#1A237E;" vertex="1" parent="1">
          <mxGeometry x="350" y="20" width="1100" height="50" as="geometry"/>
        </mxCell>
        
        <!-- Option 1: Monolith -->
        <mxCell id="opt1box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E3F2FD;strokeColor=#1976D2;strokeWidth=3;" vertex="1" parent="1">
          <mxGeometry x="80" y="100" width="480" height="380" as="geometry"/>
        </mxCell>
        
        <mxCell id="opt1title" value="Option 1: Monolith + WebSocket" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=20;fontStyle=1;fontColor=#0D47A1;" vertex="1" parent="1">
          <mxGeometry x="80" y="110" width="480" height="40" as="geometry"/>
        </mxCell>
        
        <mxCell id="opt1arch" value="🎨 Frontend: React SPA&lt;br&gt;⚙️ Backend: Node.js Express (Monolith)&lt;br&gt;🔄 Real-time: Socket.io&lt;br&gt;🗄️ Database: PostgreSQL&lt;br&gt;💾 Caching: Redis" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#BBDEFB;strokeColor=#1976D2;fontSize=14;align=left;fontColor=#0D47A1;" vertex="1" parent="1">
          <mxGeometry x="100" y="160" width="440" height="100" as="geometry"/>
        </mxCell>
        
        <mxCell id="opt1pros" value="✅ Pros:&lt;br&gt;• พัฒนาง่าย (Junior OK)&lt;br&gt;• Deploy ง่าย (1 Service)&lt;br&gt;• Cost ต่ำ&lt;br&gt;• Performance ดี" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#C8E6C9;strokeColor=#388E3C;fontSize=13;align=left;fontColor=#1B5E20;" vertex="1" parent="1">
          <mxGeometry x="100" y="270" width="200" height="100" as="geometry"/>
        </mxCell>
        
        <mxCell id="opt1cons" value="❌ Cons:&lt;br&gt;• Scalability จำกัด&lt;br&gt;• Single Point of Failure&lt;br&gt;• Deploy ทั้งก้อน" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFCDD2;strokeColor=#D32F2F;fontSize=13;align=left;fontColor=#C62828;" vertex="1" parent="1">
          <mxGeometry x="320" y="270" width="220" height="100" as="geometry"/>
        </mxCell>
        
        <mxCell id="opt1score" value="⭐⭐⭐⭐ (Score: 31/40)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=16;fontStyle=1;fontColor=#0D47A1;" vertex="1" parent="1">
          <mxGeometry x="80" y="390" width="480" height="30" as="geometry"/>
        </mxCell>
        
        <mxCell id="opt1bestfor" value="🎯 Best for: งบจำกัด, ทีมยัง Junior, ต้องการพัฒนาเร็ว" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFF9C4;strokeColor=#F9A825;fontSize=13;align=center;fontColor=#F57F17;fontStyle=2;" vertex="1" parent="1">
          <mxGeometry x="80" y="430" width="480" height="40" as="geometry"/>
        </mxCell>
        
        <!-- Option 2: Microservices -->
        <mxCell id="opt2box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#F3E5F5;strokeColor=#7B1FA2;strokeWidth=3;" vertex="1" parent="1">
          <mxGeometry x="640" y="100" width="480" height="380" as="geometry"/>
        </mxCell>
        
        <mxCell id="opt2title" value="Option 2: Microservices + Event-Driven" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=20;fontStyle=1;fontColor=#4A148C;" vertex="1" parent="1">
          <mxGeometry x="640" y="110" width="480" height="40" as="geometry"/>
        </mxCell>
        
        <mxCell id="opt2arch" value="🎨 Frontend: React SPA&lt;br&gt;🚪 API Gateway: Kong&lt;br&gt;🧩 Services: User, Board, Task, Notification&lt;br&gt;📨 Message Queue: RabbitMQ&lt;br&gt;🗄️ Database: MongoDB (per service)" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#E1BEE7;strokeColor=#7B1FA2;fontSize=14;align=left;fontColor=#4A148C;" vertex="1" parent="1">
          <mxGeometry x="660" y="160" width="440" height="100" as="geometry"/>
        </mxCell>
        
        <mxCell id="opt2pros" value="✅ Pros:&lt;br&gt;• Scalability สูงมาก&lt;br&gt;• ทีมทำงานอิสระ&lt;br&gt;• Deploy เร็ว&lt;br&gt;• Tech Diversity" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#C8E6C9;strokeColor=#388E3C;fontSize=13;align=left;fontColor=#1B5E20;" vertex="1" parent="1">
          <mxGeometry x="660" y="270" width="200" height="100" as="geometry"/>
        </mxCell>
        
        <mxCell id="opt2cons" value="❌ Cons:&lt;br&gt;• Complexity สูง&lt;br&gt;• ต้อง DevOps Skills&lt;br&gt;• Cost สูง&lt;br&gt;• Network Latency" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFCDD2;strokeColor=#D32F2F;fontSize=13;align=left;fontColor=#C62828;" vertex="1" parent="1">
          <mxGeometry x="880" y="270" width="220" height="100" as="geometry"/>
        </mxCell>
        
        <mxCell id="opt2score" value="⭐⭐⭐ (Score: 27/40)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=16;fontStyle=1;fontColor=#4A148C;" vertex="1" parent="1">
          <mxGeometry x="640" y="390" width="480" height="30" as="geometry"/>
        </mxCell>
        
        <mxCell id="opt2bestfor" value="🎯 Best for: Scalability สำคัญ, ทีม Senior, งบพอ" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFF9C4;strokeColor=#F9A825;fontSize=13;align=center;fontColor=#F57F17;fontStyle=2;" vertex="1" parent="1">
          <mxGeometry x="640" y="430" width="480" height="40" as="geometry"/>
        </mxCell>
        
        <!-- Option 3: Modular Monolith -->
        <mxCell id="opt3box" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#E8F5E9;strokeColor=#388E3C;strokeWidth=3;" vertex="1" parent="1">
          <mxGeometry x="1200" y="100" width="480" height="380" as="geometry"/>
        </mxCell>
        
        <mxCell id="opt3title" value="Option 3: Modular Monolith (SELECTED ✅)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=20;fontStyle=1;fontColor=#1B5E20;" vertex="1" parent="1">
          <mxGeometry x="1200" y="110" width="480" height="40" as="geometry"/>
        </mxCell>
        
        <mxCell id="opt3arch" value="🎨 Frontend: React SPA&lt;br&gt;⚙️ Backend: Node.js Modular Monolith&lt;br&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;&amp;nbsp;Modules: User, Board, Task, Notification&lt;br&gt;🔄 Real-time: Socket.io&lt;br&gt;🗄️ Database: PostgreSQL (Schemas per Module)" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#C8E6C9;strokeColor=#388E3C;fontSize=14;align=left;fontColor=#1B5E20;" vertex="1" parent="1">
          <mxGeometry x="1220" y="160" width="440" height="100" as="geometry"/>
        </mxCell>
        
        <mxCell id="opt3pros" value="✅ Pros:&lt;br&gt;• Balance (Simple + Modular)&lt;br&gt;• พัฒนาเร็ว&lt;br&gt;• Future-proof&lt;br&gt;• Cost ปานกลาง" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#C8E6C9;strokeColor=#388E3C;fontSize=13;align=left;fontColor=#1B5E20;" vertex="1" parent="1">
          <mxGeometry x="1220" y="270" width="200" height="100" as="geometry"/>
        </mxCell>
        
        <mxCell id="opt3cons" value="❌ Cons:&lt;br&gt;• Scalability กว่า Micro&lt;br&gt;• ต้องระวัง Boundaries&lt;br&gt;• Single Deployment" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFCDD2;strokeColor=#D32F2F;fontSize=13;align=left;fontColor=#C62828;" vertex="1" parent="1">
          <mxGeometry x="1440" y="270" width="220" height="100" as="geometry"/>
        </mxCell>
        
        <mxCell id="opt3score" value="⭐⭐⭐⭐ (Score: 31/40)" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=16;fontStyle=1;fontColor=#1B5E20;" vertex="1" parent="1">
          <mxGeometry x="1200" y="390" width="480" height="30" as="geometry"/>
        </mxCell>
        
        <mxCell id="opt3bestfor" value="🎯 Best for: Balance ทุกอย่าง, เตรียมพร้อมสำหรับอนาคต" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFF9C4;strokeColor=#F9A825;fontSize=13;align=center;fontColor=#F57F17;fontStyle=2;" vertex="1" parent="1">
          <mxGeometry x="1200" y="430" width="480" height="40" as="geometry"/>
        </mxCell>
        
        <!-- Winner Badge -->
        <mxCell id="winner" value="🏆 WINNER" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FFEB3B;strokeColor=#F57F17;fontSize=20;fontStyle=1;fontColor=#F57F17;strokeWidth=3;" vertex="1" parent="1">
          <mxGeometry x="1380" y="40" width="120" height="120" as="geometry"/>
        </mxCell>
        
        <!-- Bottom Decision Matrix -->
        <mxCell id="matrix" value="📊 Decision Matrix" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=22;fontStyle=1;fontColor=#1A237E;" vertex="1" parent="1">
          <mxGeometry x="80" y="520" width="1600" height="40" as="geometry"/>
        </mxCell>
        
        <!-- Table Header -->
        <mxCell id="tblheader" value="Criteria" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#5C6BC0;strokeColor=#1A237E;fontSize=15;fontStyle=1;fontColor=#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="80" y="570" width="200" height="40" as="geometry"/>
        </mxCell>
        
        <mxCell id="tblopt1" value="Option 1" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1976D2;strokeColor=#0D47A1;fontSize=15;fontStyle=1;fontColor=#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="280" y="570" width="180" height="40" as="geometry"/>
        </mxCell>
        
        <mxCell id="tblopt2" value="Option 2" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#7B1FA2;strokeColor=#4A148C;fontSize=15;fontStyle=1;fontColor=#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="460" y="570" width="180" height="40" as="geometry"/>
        </mxCell>
        
        <mxCell id="tblopt3" value="Option 3 ✅" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#388E3C;strokeColor=#1B5E20;fontSize=15;fontStyle=1;fontColor=#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="640" y="570" width="180" height="40" as="geometry"/>
        </mxCell>
        
        <!-- Table Rows -->
        <!-- Row 1: Scalability -->
        <mxCell id="row1c1" value="Scalability" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F5F5F5;strokeColor=#9E9E9E;fontSize=14;align=left;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="80" y="610" width="200" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="row1c2" value="⭐⭐" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9E9E9E;fontSize=14;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="280" y="610" width="180" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="row1c3" value="⭐⭐⭐⭐⭐" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9E9E9E;fontSize=14;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="460" y="610" width="180" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="row1c4" value="⭐⭐⭐" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9E9E9E;fontSize=14;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="640" y="610" width="180" height="35" as="geometry"/>
        </mxCell>
        
        <!-- Row 2: Performance -->
        <mxCell id="row2c1" value="Performance" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F5F5F5;strokeColor=#9E9E9E;fontSize=14;align=left;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="80" y="645" width="200" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="row2c2" value="⭐⭐⭐⭐⭐" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9E9E9E;fontSize=14;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="280" y="645" width="180" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="row2c3" value="⭐⭐⭐" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9E9E9E;fontSize=14;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="460" y="645" width="180" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="row2c4" value="⭐⭐⭐⭐" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9E9E9E;fontSize=14;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="640" y="645" width="180" height="35" as="geometry"/>
        </mxCell>
        
        <!-- Row 3: Development Speed -->
        <mxCell id="row3c1" value="Development Speed" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F5F5F5;strokeColor=#9E9E9E;fontSize=14;align=left;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="80" y="680" width="200" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="row3c2" value="⭐⭐⭐⭐⭐" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9E9E9E;fontSize=14;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="280" y="680" width="180" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="row3c3" value="⭐⭐" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9E9E9E;fontSize=14;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="460" y="680" width="180" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="row3c4" value="⭐⭐⭐⭐" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9E9E9E;fontSize=14;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="640" y="680" width="180" height="35" as="geometry"/>
        </mxCell>
        
        <!-- Row 4: Complexity -->
        <mxCell id="row4c1" value="Complexity (Lower is better)" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F5F5F5;strokeColor=#9E9E9E;fontSize=14;align=left;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="80" y="715" width="200" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="row4c2" value="⭐⭐⭐⭐⭐" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9E9E9E;fontSize=14;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="280" y="715" width="180" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="row4c3" value="⭐" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9E9E9E;fontSize=14;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="460" y="715" width="180" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="row4c4" value="⭐⭐⭐" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9E9E9E;fontSize=14;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="640" y="715" width="180" height="35" as="geometry"/>
        </mxCell>
        
        <!-- Row 5: Team Fit -->
        <mxCell id="row5c1" value="Team Fit" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F5F5F5;strokeColor=#9E9E9E;fontSize=14;align=left;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="80" y="750" width="200" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="row5c2" value="⭐⭐⭐⭐⭐" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9E9E9E;fontSize=14;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="280" y="750" width="180" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="row5c3" value="⭐⭐" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9E9E9E;fontSize=14;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="460" y="750" width="180" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="row5c4" value="⭐⭐⭐⭐" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9E9E9E;fontSize=14;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="640" y="750" width="180" height="35" as="geometry"/>
        </mxCell>
        
        <!-- Row 6: Cost -->
        <mxCell id="row6c1" value="Cost" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F5F5F5;strokeColor=#9E9E9E;fontSize=14;align=left;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="80" y="785" width="200" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="row6c2" value="⭐⭐⭐⭐⭐" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9E9E9E;fontSize=14;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="280" y="785" width="180" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="row6c3" value="⭐⭐" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9E9E9E;fontSize=14;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="460" y="785" width="180" height="35" as="geometry"/>
        </mxCell>
        <mxCell id="row6c4" value="⭐⭐⭐⭐" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#9E9E9E;fontSize=14;fontColor=#424242;" vertex="1" parent="1">
          <mxGeometry x="640" y="785" width="180" height="35" as="geometry"/>
        </mxCell>
        
        <!-- Total Score Row -->
        <mxCell id="total1" value="Total Score" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#5C6BC0;strokeColor=#1A237E;fontSize=15;fontStyle=1;fontColor=#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="80" y="820" width="200" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="total2" value="31/40" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#1976D2;strokeColor=#0D47A1;fontSize=15;fontStyle=1;fontColor=#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="280" y="820" width="180" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="total3" value="27/40" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#7B1FA2;strokeColor=#4A148C;fontSize=15;fontStyle=1;fontColor=#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="460" y="820" width="180" height="40" as="geometry"/>
        </mxCell>
        <mxCell id="total4" value="31/40 ✅" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#388E3C;strokeColor=#1B5E20;fontSize=15;fontStyle=1;fontColor=#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="640" y="820" width="180" height="40" as="geometry"/>
        </mxCell>
        
        <!-- Final Decision Note -->
        <mxCell id="decision" value="💡 Final Decision: เลือก Option 3 - Modular Monolith เพราะ Balance ระหว่าง Simplicity, Scalability, และ Future-proofing + เหมาะกับทีมและงบประมาณ" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFDE7;strokeColor=#FBC02D;fontSize=15;align=center;fontColor=#F57F17;fontStyle=2;" vertex="1" parent="1">
          <mxGeometry x="880" y="570" width="800" height="290" as="geometry"/>
        </mxCell>
        
        <!-- Reasons -->
        <mxCell id="reasons" value="✅ เหตุผลหลัก:&lt;br&gt;&lt;br&gt;1️⃣ เหมาะกับทีม Mid-level&lt;br&gt;2️⃣ พัฒนาทันเวลา 3 เดือน&lt;br&gt;3️⃣ Cost ไม่สูงเกินไป&lt;br&gt;4️⃣ สามารถแยกเป็น Microservices ได้ในอนาคต&lt;br&gt;5️⃣ Module Boundaries ชัดเจน&lt;br&gt;6️⃣ ได้ทั้ง Simplicity และ Modularity" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#E8F5E9;strokeColor=#388E3C;fontSize=14;align=left;fontColor=#1B5E20;" vertex="1" parent="1">
          <mxGeometry x="900" y="600" width="760" height="150" as="geometry"/>
        </mxCell>
        
        <mxCell id="risks" value="⚠️ ความเสี่ยง:&lt;br&gt;&lt;br&gt;• Module Boundaries อาจไม่ชัดเจน → ใช้ DDD ช่วย&lt;br&gt;• Scalability จำกัดกว่า Microservices → เตรียมแผน Migration" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFEBEE;strokeColor=#E53935;fontSize=13;align=left;fontColor=#C62828;" vertex="1" parent="1">
          <mxGeometry x="900" y="760" width="760" height="80" as="geometry"/>
        </mxCell>
        
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

## Diagram 5: ADR (Architecture Decision Record) Structure

```xml
<mxfile host="app.diagrams.net">
  <diagram name="ADR-Structure">
    <mxGraphModel dx="1400" dy="900" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1400" pageHeight="900">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Title -->
        <mxCell id="title" value="📝 Architecture Decision Record (ADR) โครงสร้าง" style="text;html=1;strokeColor=none;fillColor=none;align=center;verticalAlign=middle;whiteSpace=wrap;fontSize=26;fontStyle=1;fontColor=#1A237E;" vertex="1" parent="1">
          <mxGeometry x="300" y="20" width="800" height="50" as="geometry"/>
        </mxCell>
        
        <!-- ADR Document Container -->
        <mxCell id="doc" value="" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#FFFFFF;strokeColor=#5C6BC0;strokeWidth=4;" vertex="1" parent="1">
          <mxGeometry x="200" y="100" width="1000" height="750" as="geometry"/>
        </mxCell>
        
        <!-- Header Section -->
        <mxCell id="header" value="ADR-001: [Title of Decision]" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#5C6BC0;strokeColor=#1A237E;fontSize=20;fontStyle=1;fontColor=#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="220" y="120" width="960" height="60" as="geometry"/>
        </mxCell>
        
        <!-- Metadata -->
        <mxCell id="metadata" value="Date: YYYY-MM-DD&lt;br&gt;Status: Accepted / Proposed / Deprecated&lt;br&gt;Deciders: [ชื่อทีม]" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#E8EAF6;strokeColor=#5C6BC0;fontSize=14;align=left;fontColor=#1A237E;" vertex="1" parent="1">
          <mxGeometry x="220" y="200" width="960" height="60" as="geometry"/>
        </mxCell>
        
        <!-- Section 1: Context -->
        <mxCell id="sec1title" value="1️⃣ Context (บริบท)" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFF9C4;strokeColor=#F9A825;fontSize=16;fontStyle=1;fontColor=#F57F17;" vertex="1" parent="1">
          <mxGeometry x="220" y="280" width="960" height="40" as="geometry"/>
        </mxCell>
        
        <mxCell id="sec1content" value="📋 Background: [ที่มาของปัญหา]&lt;br&gt;❓ Problem Statement: [ปัญหาที่ต้องการแก้]&lt;br&gt;🎯 Key Drivers:&lt;br&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;• Functional Requirements&lt;br&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;• Quality Attributes&lt;br&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;• Constraints" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#FFFDE7;strokeColor=#FBC02D;fontSize=13;align=left;fontColor=#F57F17;" vertex="1" parent="1">
          <mxGeometry x="220" y="320" width="960" height="100" as="geometry"/>
        </mxCell>
        
        <!-- Section 2: Decision -->
        <mxCell id="sec2title" value="2️⃣ Decision (การตัดสินใจ)" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#E1F5FE;strokeColor=#0277BD;fontSize=16;fontStyle=1;fontColor=#01579B;" vertex="1" parent="1">
          <mxGeometry x="220" y="440" width="960" height="40" as="geometry"/>
        </mxCell>
        
        <mxCell id="sec2content" value="✅ We will use [Architecture/Pattern name]&lt;br&gt;&lt;br&gt;🏗️ Components: [รายชื่อ components หลัก]&lt;br&gt;💻 Technologies: [Tech stack]&lt;br&gt;📐 Architectural Patterns: [Patterns ที่ใช้]" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#E3F2FD;strokeColor=#1976D2;fontSize=13;align=left;fontColor=#0D47A1;" vertex="1" parent="1">
          <mxGeometry x="220" y="480" width="960" height="90" as="geometry"/>
        </mxCell>
        
        <!-- Section 3: Rationale -->
        <mxCell id="sec3title" value="3️⃣ Rationale (เหตุผล)" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F3E5F5;strokeColor=#7B1FA2;fontSize=16;fontStyle=1;fontColor=#4A148C;" vertex="1" parent="1">
          <mxGeometry x="220" y="590" width="960" height="40" as="geometry"/>
        </mxCell>
        
        <mxCell id="sec3content" value="💡 Why this decision?&lt;br&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;• [เหตุผลที่ 1]&lt;br&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;• [เหตุผลที่ 2]&lt;br&gt;&lt;br&gt;🔄 Alternatives Considered:&lt;br&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;• Option 1: [Pros/Cons/Why not]&lt;br&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;• Option 2: [Pros/Cons/Why not]" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#F8BBD0;strokeColor=#C2185B;fontSize=13;align=left;fontColor=#880E4F;" vertex="1" parent="1">
          <mxGeometry x="220" y="630" width="960" height="110" as="geometry"/>
        </mxCell>
        
        <!-- Section 4: Consequences -->
        <mxCell id="sec4title" value="4️⃣ Consequences (ผลที่ตามมา)" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#E8F5E9;strokeColor=#388E3C;fontSize=16;fontStyle=1;fontColor=#1B5E20;" vertex="1" parent="1">
          <mxGeometry x="220" y="760" width="460" height="40" as="geometry"/>
        </mxCell>
        
        <mxCell id="sec4content" value="✅ Positive (ข้อดี):&lt;br&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;• ...&lt;br&gt;&lt;br&gt;❌ Negative (ข้อเสีย):&lt;br&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;• ... → Mitigation: ...&lt;br&gt;&lt;br&gt;⚠️ Risks (ความเสี่ยง):&lt;br&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;• Risk: ...&lt;br&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;• Impact/Probability: ...&lt;br&gt;&amp;nbsp;&amp;nbsp;&amp;nbsp;• Mitigation: ..." style="rounded=0;whiteSpace=wrap;html=1;fillColor=#C8E6C9;strokeColor=#388E3C;fontSize=12;align=left;fontColor=#1B5E20;" vertex="1" parent="1">
          <mxGeometry x="220" y="800" width="460" height="160" as="geometry"/>
        </mxCell>
        
        <!-- Benefits Box -->
        <mxCell id="benefits" value="🎯 Benefits of ADR" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#BBDEFB;strokeColor=#1976D2;fontSize=16;fontStyle=1;fontColor=#0D47A1;" vertex="1" parent="1">
          <mxGeometry x="720" y="760" width="460" height="40" as="geometry"/>
        </mxCell>
        
        <mxCell id="benefitslist" value="1️⃣ บันทึกการตัดสินใจอย่างเป็นระบบ&lt;br&gt;2️⃣ สื่อสารเหตุผลให้ทีมเข้าใจ&lt;br&gt;3️⃣ ทีมใหม่เข้าใจ Context ได้เร็ว&lt;br&gt;4️⃣ ย้อนดูการตัดสินใจในอดีตได้&lt;br&gt;5️⃣ ป้องกัน "ทำไมถึงออกแบบแบบนี้?"&lt;br&gt;6️⃣ อ้างอิงได้เมื่อต้องการเปลี่ยนแปลง&lt;br&gt;7️⃣ Knowledge Management" style="rounded=0;whiteSpace=wrap;html=1;fillColor=#E3F2FD;strokeColor=#1976D2;fontSize=13;align=left;fontColor=#0D47A1;" vertex="1" parent="1">
          <mxGeometry x="720" y="800" width="460" height="160" as="geometry"/>
        </mxCell>
        
        <!-- Side Notes -->
        <mxCell id="note1" value="💡 Tips:&lt;br&gt;ADR ควรเขียน&lt;br&gt;ให้กระชับ&lt;br&gt;แต่ครอบคลุม" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#FFECB3;strokeColor=#FFA000;fontSize=12;fontColor=#FF6F00;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="300" width="120" height="120" as="geometry"/>
        </mxCell>
        
        <mxCell id="note2" value="⚡ Best Practice:&lt;br&gt;เขียน ADR&lt;br&gt;ทุกครั้งที่มี&lt;br&gt;การตัดสินใจ&lt;br&gt;ที่สำคัญ" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor=#C8E6C9;strokeColor=#388E3C;fontSize=12;fontColor=#1B5E20;fontStyle=1;" vertex="1" parent="1">
          <mxGeometry x="50" y="500" width="120" height="120" as="geometry"/>
        </mxCell>
        
        <mxCell id="note3" value="📝 Template:&lt;br&gt;ใช้ Template&lt;br&gt;เดียวกัน&lt;br&gt;ทั้งโครงการ" style="ellipse;whiteSpace=wrap;html=1;aspect=fixed;fillColor="#FFCDD2;" strokeColor="#D32F2F;" fontSize="12;" fontColor="#C62828;" fontStyle="1;" vertex="1" parent="1">
          <mxGeometry x="50" y="700" width="120" height="120" as="geometry"/>
        </mxCell>
        
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

**หมายเหตุการใช้งาน Draw.io XML:**

1. เปิด https://app.diagrams.net
2. File → Import from → URL (หรือ Paste XML)
3. Copy XML code ทั้งหมดของแต่ละ Diagram
4. Paste และ Import
5. Edit หรือ Export เป็นรูปภาพได้ตามต้องการ

**คุณสมบัติของ Diagrams:**
- ✅ สีสันสดใส ทันสมัย
- ✅ มี Icons และ Emojis ช่วยให้เข้าใจง่าย
- ✅ Layout ชัดเจน อ่านง่าย
- ✅ เหมาะสำหรับการนำเสนอ
- ✅ สามารถ Edit ได้ใน Draw.io

---
