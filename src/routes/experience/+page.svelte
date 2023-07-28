<script lang="ts">
    import { base } from '$app/paths';
import druref from '$lib/assets/DruReference.pdf'
    import { modBase } from '$lib/stores';
</script>

<div class='outer'>
    <h1>Experience</h1>
    <h2>Ernst & Young</h2>
    <p>Mar 2014 - Feb 2016</p>
    <p>Research & Development Tax Consultant</p>
    <a class="pRef brutal-border" href="{base}/RobinRef.pdf">Personal Reference</a>
    <h2>Norwood Systems</h2>
    <p>Sep 2017 - May 2019</p>
    <p>Android Application Developer</p>
    <h2>Advanced Human Imaging</h2>
    <p>May 2019 - Nov 2020</p>
    <p>Android Application Developer</p>
    <h2>One More Cloud Inc.</h2>
    <p>Nov 2020 - May 2023</p>
    <p>Cloud Platform Engineer</p>
    <a class="pRef brutal-border" href="{druref}">Personal Reference</a>
</div>

<style>
    .outer{
        margin-top:90px;
        margin-left:20px;
    }
    .pRef{
        display: inline-block;
        padding:10px;
        margin:10px;
        background-color: var(--colorlight);
    }
</style>