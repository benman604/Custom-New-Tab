<script>
	// import { onMount } from 'svelte';
	import BackgroundImage from './components/BackgroundImage.svelte';
	import FocusModeToggler from './components/FocusModeToggler.svelte';
	import SearchBar from './components/SearchBar.svelte';
	import VisibilityOnCollapse from './components/VisibilityOnCollapse.svelte';
	import Settings from './components/Settings.svelte';
	
	import ToDoList from './components/widgets/ToDoList.svelte';
	import Notes from './components/widgets/Notes.svelte';
	
	let focusMode = false	
	let wallpaperUrl = ""
	console.log("ready")
	
	try {
		chrome.storage.local.get(['focusmode'], function(result) {
			if(result.focusmode != undefined){
				focusMode = JSON.parse(result.focusmode)
			}
		})

		chrome.storage.local.get(['wallpaper'], function(result) {
			if(result.wallpaper != undefined){
				wallpaperUrl = result.wallpaper
			}
		})

		chrome.storage.onChanged.addListener(function(changes, namespace) {
			for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
				if(key == "focusmode"){
					focusMode = JSON.parse(newValue)
				}
				if(key == "wallpaper"){
					wallpaperUrl = newValue
				}
			}
		});
	} catch (error) {
		console.log(error)
	}
</script>

<main>
	<BackgroundImage imageURL={wallpaperUrl}/>
	<FocusModeToggler bind:focusMode={focusMode}/>
	<Settings bind:imageURL={wallpaperUrl}/>
	
	<div class="root {(focusMode) ? 'collapsed' : ''}">
		<div class="branding">
			<div class="logo"></div>
			<div class="watermark"></div>
		</div> <!-- branding -->
		
		<SearchBar />
		<VisibilityOnCollapse focusMode={focusMode} visibilityOnCollapse={true}>
			<div class="box">
				<div class="grid centered">
					<a href="https://classroom.google.com/u/0/c/NDk3NTUwMDYyMTg2">AP Gov/Econ</a>
					<a href="https://classroom.google.com/u/0/c/NDk3MjY1ODI1MDEz">AP Bio</a>
					<a href="https://classroom.google.com/u/0/c/NTc5NDM1OTg4NjM5">AP Enviro</a>
					<a href="https://apclassroom.collegeboard.org/subjects/preview">AP Classroom</a>
					<a href="https://foothillcollege.instructure.com/courses/22928/modules">Math 1B</a>
					<a href="https://docs.google.com/spreadsheets/d/17crmjRtfTR5doOO4SmvCV7-8ToO_j0d7rY9bXjVyuXM/edit#gid=1783743105">App Status</a>
				</div>
			</div>
		</VisibilityOnCollapse> <!-- collapse shortcuts -->
		
		<VisibilityOnCollapse focusMode={focusMode} visibilityOnCollapse={false}>
			<!-- // -->

			<div class="notbox">
				<div class="notbuttons">
					<div class="grid">
						<div class="box">
							<a class="primary" href="https://classroom.google.com/u/0/c/NDk3MjY1ODI1MDEz">AP Bio</a>
							<a href="https://sites.google.com/fusdk12.net/koehlerbio2022/ap-biology/slides?authuser=0">Bio Slides</a>
							<a href="https://login.pearson.com/v1/piapi/piui/signin?client_id=dN4bOBG0sGO9c9HADrifwQeqma5vjREy&okurl=https:%2F%2Fportal.mypearson.com%2Fcourse-home&siteid=8313">Mastering Bio</a>
							<a href="https://apclassroom.collegeboard.org/6/home">AP Classroom</a>
							<br>
						</div>
						<div class="box">
							<a class="primary" href="https://classroom.google.com/u/0/c/NDk3NTUwMDYyMTg2">AP Gov/Econ</a>
							<a href="https://docs.google.com/document/d/1f-mKegAfsEwGPj8d9rNzNw_ox8uBO1cya_Dv1iJOfsw/edit">Econ Calendar</a>
							<a href="https://my.mheducation.com/login?redirectUrl=https:%2F%2Fmy.mheducation.com%2Fsecure%2Fstudent%2Furn:com.mheducation.openlearning:enterprise.identity.organization:prod.global:organization:f22fe89c-d723-43e4-8669-b77c60f93667%2Fhome">McGraw Hill</a>
							<a href="https://ihs-fusd-ca.schoolloop.com/file/1548059165367/1327737725638/2032417159146621876.pdf">QUEST Packet</a>
						</div>
						<div class="box">
							<a class="primary" href="https://classroom.google.com/u/0/c/NTc5NDM1OTg4NjM5">AP Enviro</a>
							<a href="https://docs.google.com/spreadsheets/d/1TkWUuSswmAg811TL9-mJ8xSxfCzutr-Y8AUoMuzhF6k/edit#gid=110322930">APES Slides</a>
							<a href="https://apclassroom.collegeboard.org/14/home">AP Classroom</a>
						</div>
						<div class="box">
							<a class="primary" href="https://foothillcollege.instructure.com/courses/22928">Math 1B</a>
							<a href="https://openvellum.ecollege.com/course.html?courseId=17788346&OpenVellumHMAC=6a668420bafd6145034b48db9753face#10001">MyLab</a>
						</div>
					</div>
				</div>
			</div>

			<!-- \\ -->
			
			<div class="grid">
				<div class="box">
					<p>School</p>
					<ul>
						<li><a href="https://fremontunifiedca.infinitecampus.org/campus/portal/students/fremont.jsp?status=login">Infinite Campus</a></li>
						<li><a href="https://drive.google.com/drive/u/0/my-drive">Google Drive</a></li>
						<li><a href="https://www.khanacademy.org/profile/me/courses">Khan Academy</a></li>
						<li><a href="https://apclassroom.collegeboard.org/subjects/preview">AP Classroom</a></li>
						
						<br>
						<li><a href="https://classroom.google.com/u/0/c/NTI2MzczNjcwODkz">English 12</a></li>
						<li><a href="https://classroom.google.com/u/0/c/NDk3NTY4ODM4MzAy">Guitar 1</a></li>
						<li><a href="https://classroom.google.com/u/0/c/NTM5MjczODE4NjM3">Art 1</a></li>
					</ul>
				</div>
				<div class="box">
					<p>Work</p>
					<ul>
						<li><a href="https://gmail.com">Gmail</a></li>
						<li><a href="https://calendar.google.com/calendar/u/0/r">Calendar</a></li>
						<li><a href="https://github.com/benman604">Github</a></li>
						<li><a href="https://transizion.slack.com/">Slack</a></li>
						<li><a href="https://collegerize.com/mentor/timesheet_entries">Timesheet</a></li>
						<li><a href="https://docs.google.com/spreadsheets/d/17crmjRtfTR5doOO4SmvCV7-8ToO_j0d7rY9bXjVyuXM/edit#gid=1783743105">App Status</a></li>
					</ul>
				</div>
				
				<div class="box">
					<p>Social</p>
					<ul>
						<li><a href="https://youtube.com">Youtube</a></li>
						<li><a href="https://open.spotify.com/">Spotify</a></li>
						<li><a href="https://reddit.com">Reddit</a></li>
						<li><a href="https://discord.com/app">Discord</a></li>
						<li><a href="https://messenger.com">Messenger</a></li>
						<li><a href="https://instagram.com">Instagram</a></li>
					</ul>
				</div>
			</div> <!-- grid 1 -->

		</VisibilityOnCollapse> <!-- collapsable content -->
		
	</div> <!-- root -->
	
	<br><br><br>
</main>

<style>
	.root{
		width: 746px;
		margin: auto;
	}
	
	@media (max-width: 800px) {
		.root{
			width: 100%;
		}
	}
	
	.branding{
		align-items: center;
		display: flex;
		justify-content: left;
		margin-bottom: 0
	}
	
	@supports (-moz-appearance:none) {
		.logo{
			background: url("chrome://branding/content/about-logo.png") no-repeat center;
			background-size: 82px;
			display: inline-block;
			height: 82px;
			width: 82px;
		}
		
		.watermark {
			background: url("chrome://branding/content/firefox-wordmark.svg") no-repeat center center;
			background-size: 134px;
			display: inline-block;
			height: 82px;
			margin-inline-start: 16px;
			width: 134px;
			filter: invert(100%) sepia(100%) saturate(1%) hue-rotate(276deg) brightness(104%) contrast(101%);
		}
	}
	
	.root.collapsed {
		margin: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		-ms-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
	}
</style>