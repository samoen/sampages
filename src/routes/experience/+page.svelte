<script lang="ts">
    import { base } from "$app/paths";
    import druref from "$lib/assets/DruReference.pdf";
    import sturef from "$lib/assets/StuartLetterOfReccomendation.pdf";
    import jillref from "$lib/assets/JillReference.pdf";
    import terrenceref from "$lib/assets/TerenceReference.pdf";
    import { modBase } from "$lib/stores";
    import Pdf from "$lib/assets/pdf.svelte";
    import ExternalLink from "$lib/assets/ExternalLink.svelte";
</script>

<div class="outer">
    <h1>Experience</h1>
    <div class="job brutal-border">
        <h2>One More Cloud Inc.</h2>
        <a href="https://omc.io/" class="extLink brutal-border">
            <div>
                <ExternalLink></ExternalLink>
            </div>
            omc.io
        </a>
        <h3>Cloud Platform Engineer</h3>
        <p>Nov 2020 - May 2023</p>
        <p>
            Development of the Bonsai hosted Elasticsearch platform. Deployment and maintenance of cloud infrastructure
            on AWS and Google Cloud. Conduct operations and 24/7 incident response for a range of SaaS platform systems.
        </p>
        <a class="pRef brutal-border" href="{druref}"
            >
            <div class="pdficon"><Pdf></Pdf></div>
            Reference
            </a>
    </div>
    <div class="job brutal-border">
        <h2>Advanced Human Intelligence</h2>
        <a href="https://www.ahi.tech/" class="extLink brutal-border">
            <div>
                <ExternalLink></ExternalLink>
            </div>
            ahi.tech
        </a>
        <h3>Android Application Developer</h3>
        <p>May 2019 - Nov 2020</p>
        <p>
            Development of the AHI body measurement SDK for Android.
            Capture and display a 3D model of the user. Compute body
            measurements and health insights using on-device ML
            models. Persist privacy sensitive data in accordance with
            GDPR. Utilize microservices, AWS lambda and S3. Design and
            document a developer friendly Java API.
        </p>
        <a class="pRef brutal-border" href="{terrenceref}"
            >
            <div class="pdficon"><Pdf></Pdf></div>
            Reference
        </a>
    </div>
    <div class="job brutal-border">
        <h2>Norwood Systems</h2>
        <a href="https://norwoodsystems.com/" class="extLink brutal-border">
            <div>
                <ExternalLink></ExternalLink>
            </div>
            norwoodsystems.com
        </a>
        
        <h3>Android Application Developer</h3>
        <p>Sep 2017 - May 2019</p>
        <p>
            Development and release of World Message, Secure, Wi-fi,
            and Voicemail. Process Wi-Fi and location data, perform
            VPN networking, interact with media in distributed
            databases. Utilize machine learning driven web APIs to
            transcribe and translate voice audio.
        </p>
        <a class="pRef brutal-border" href="{sturef}"
        ><div class="pdficon"><Pdf></Pdf></div>Reference</a
        >
    </div>
    <div class="job brutal-border">
        <h2>Ernst & Young</h2>
        <a href="https://www.ey.com/" class="extLink brutal-border">
            <div>
                <ExternalLink></ExternalLink>
            </div>
            ey.com
        </a>
        <h3>R&D Tax Incentives Consultant</h3>
        <p>Mar 2014 - Feb 2016</p>
        <p>
            Assessment of Research & Development projects undertaken
            by clients of Ernst & Young. Preparation of detailed
            applications that communicate technical and financial
            aspects to the regulatory bodies AusIndustry and the
            Australian Tax Office. Interact with multinational
            corporations in the mining and manufacturing industries.
        </p>
        <a class="pRef brutal-border" href="{base}/RobinRef.pdf"
            ><div class="pdficon"><Pdf></Pdf></div>Reference 1</a
        >
        <a class="pRef brutal-border" href="{jillref}"
            ><div class="pdficon"><Pdf></Pdf></div>Reference 2</a
        >
    </div>
</div>

<style>
    .outer {
        margin-top: 90px;
        margin-left: 3vw;
        margin-right: 3vw;
        /* background:blue; */
    }
    .outer > * {
        margin-inline: auto;
        max-width: 800px;
    }
    h2{
        display: inline-block;
        margin-right:10px;
    }
    .extLink{
        /* height:30px; */
        background-color: var(--colorsecondary);
        display: inline-flex;
        gap:5px;
        align-items: center;
        padding:6px;
        margin-bottom: 10px;
    }
    .extLink div {
        height:20px;
    }
    .pRef {
        display: inline-block;
        margin-bottom:5px;
        padding: 6px;
        /* margin:10px; */
        background-color: var(--colorsecondary);
        display: inline-flex;
        align-items: center;
        gap:5px;
    }
    .pdficon{
        height:20px;
        width:20px;
    }
    .job {
        background: var(--colorlight);
        padding: 10px;
        margin-top: 10px;
    }
</style>
