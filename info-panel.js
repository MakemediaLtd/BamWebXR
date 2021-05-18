/* global AFRAME */
AFRAME.registerComponent('info-panel', {
  init: function () {
    var buttonEls = document.querySelectorAll('.menu-button');
    var fadeBackgroundEl = this.fadeBackgroundEl = document.querySelector('#fadeBackground');

    this.movieImageEl;
    this.movieTitleEl = document.querySelector('#movieTitle');
    this.movieDescriptionEl = document.querySelector('#movieDescription');
	
	this.currentSection;
	this.currentSectionVideoIndex = 0;
	this._360VideoPlayer = document.querySelector('#_360Player');
	
	
	this.UIMenu = document.querySelector('#menu');
	this.InfoPanel = document.querySelector('#infoPanel');

	
	this.Cam = document.querySelector('#cam');
	this.wrapScene = document.querySelector('#wrapScene');
	
	this.playerMenu = document.querySelector('#PlayerMenu');
	this.playerMenuNextVideo = document.querySelector('#PlayerMenuNextVideo');
	this.playerMenuReturnToMainMenu = document.querySelector('#PlayerMenuReturnToMainMenu');
	
	
//	var PanelBackground  = 'UI/PanelBackground.png';
	//var Play360ButtonBackground = 'UI/PlayButtonBackground.png';
	
	this.welcomePanel = document.querySelector('#welcomePanel');
	
	//this.welcomePanel.setAttribute('material', 'src', PanelBackground);
	
	//this.InfoPanel.setAttribute('material', 'src', PanelBackground);
	
	this.scene = document.querySelector('a-scene');
	
	this.cursor = document.querySelector('#cursor');
	this.camRig = document.querySelector('#camRigHelper');
	
	this.MenuYRotLast = 0;
	
	// Need to set RAY ORIGIN to enity if we are in VR
	
	this.bamXrInfo = {
		LondonCityAirportBTN:{
			title:'London City Airport',
			description: 'BAM Nuttall and BAM International have jointly been awarded a contract for £85m to construct a 75,000m² concrete deck extension providing a new taxiway and additional aircraft parking.  The project is part of a £480m development programme for the airport and involves over 1000 steel cased concrete piles, installation of over 6000 precast sections and pouring over 43,500m³ of concrete.',
			vidSrc: 
			[
				'Airport_01_1mbits_half',
				'Airport_02_1mbits_half',
				'Airport_03_1mbits_half',
				'Airport_04_1mbits_half',
				'Airport_05_1mbits_half'
				
			],
			vidSrcPath: 'Video/LondonCityAirport/',
			bannerImg: '#London-City-Airport-2IMG',
			_360Img: 'Airport_04_130446',
			imgEl: document.querySelector('#MovieImage'),
			keyFacts:
			[
				'Prior to work a 500kg UXB was found and safely detonated by the Royal Navy',		
				'New deck is suspended over the existing dock which is 11m deep',
				'Work started in Jan 2018 and planned completion is May 2020',
				'Original award was £85m split 70% BAM Nuttall and 30% BAM International'
			]
			
		},
		TidwayBTN:{
			title:'Thames Tideway West',
			description: 'BMB, a Joint Venture between BAM Nuttall, Morgan Sindall and Balfour Beatty was awarded the £416m contract to construct the 6km west section of the Thames Tideway Tunnel.  The Tunnel’s purpose is to prevent pollution from the city’s sewerage network being discharged directly into the Thames estimated in tens of millions of tonnes per year.  The overall cost of the Tideway project is £4.9bn.',
			vidSrc: 
			[
				'Tideway_01_1mbits_half',
				'Tideway_02_1mbits_half',
				'Tideway_03_1mbits_half'
			],
			vidSrcPath: 'Video/ThamesTideway/',
			bannerImg: '#TTWIMG',
			_360Img: 'Tideway_01_182549',
			imgEl: document.querySelector('#MovieImage'),
			keyFacts:
			[
				'The river is used to transport materials and work arisings',		
				'Each barge movement on the river saves up to 100 road transport movements',
				'Work began 2016 and will complete in 2022',
				'£416m split equally between the three JV partners'
			]
			
			
		},
		HPCBTN:{
			title:'Hinkley Point C',
			description: 'The first new nuclear power station to be built in the UK in over 20 years; Hinkley Point C will provide low-carbon electricity for around 6 million homes, create thousands of jobs and bring lasting benefits to the UK economy. On a site that is the size of 245 football pitches, the KBJV team are working on site preparation and earthworks stages of the project.',
			vidSrc: 
			[
				'HPC_01_1mbits_half',
				'HPC_02_1mbits_half',
				'HPC_03_1mbits_half',
				'HPC_04_1mbits_half',
				'HPC_05_1mbits_half',
				'HPC_06_1mbits_half',
				'HPC_07_1mbits_half'
			],
			vidSrcPath:'Video/HinkleyPointC/',
			bannerImg: '#hinkley_pointIMG',
			_360Img: 'HPC_07_135636',
			imgEl: document.querySelector('#MovieImage'),
			keyFacts:
			[
				'Seawall - 50,000m³ of in-situ concrete placed in a SSSI marine environment, without environmental incident',		
				'Deep Dig – HOR completed ahead of schedule considered the foundation of the HPC Project',
				'10 year project timeline. Currently various goals still to launch which are all critical to the ‘Drive to ’25’',
				'Cost of total project £22.5bn'
			]
			
		},
		BostonBarrierBTN:{
			title:'Boston Barrier',
			description: 'BMJV, a Joint Venture between BAM Nuttall and Mott MacDonald were awarded the contract for the design and construction of flood defence works including the movable gate across the River Haven protecting over 14,000 homes.  Boston has been susceptible to flooding with a significant tidal event in 2013 causing damage to 100s of homes.  The new barrier will protect the town from tidal surge flooding for years to come.',
			vidSrc: 
			[
				//'output',
				'Boston_01_1mbits_half',
				//'output',
				//'output'
				'Boston_02_1mbits_half',
				'Boston_03_1mbits_half'
			],
			vidSrcPath: 'Video/BostonBarrier/',
			bannerImg: '#BostonBarrierIMG',
			_360Img: 'Boston_03_155408',
			imgEl: document.querySelector('#MovieImage'),
			keyFacts:
			[
				'The movable steel flood barrier is 25m wide and weighs 300 tonnes',		
				'2000 tonnes of sheet piles and 19000 tonnes of concrete will be installed',
				'Work started August 2017 and planned completion is by end of 2021',
				'£105m project'
			]
			
		}
		
	};
	
	this.VideoIsPlaying = false;
	this.SubtitlesText = document.querySelector('#subtitleText');
	this.SubtitlesText.setAttribute('visible', false);
	this.SubtitlesText.object3D.frustumCulled = false;
	this.CurrentVideoPlaying;
	this.SubtitleCounter = 0;
	this.SubtitleIndex = 0;
	
	this.Subtitles = {
				Airport_01_2mbits:
				[				
									
					[5.0, 'Ahead and looking east you can see the original dock basin.'],
					[10, 'We are extending the airport over the water which is around 11 metres deep using a suspended slab design.'],
					[17, ' '],
					[20, 'To the right, we can see the floating platform carrying all the piling equipment.'],
					[26, 'In front of the orange crane, lying on the platform are large steel tubes called pile casings.'],
					[34, 'These sit alongside silos for storing concrete mix materials,'],
					[39, 'as well as other cranes and rigs which are being used for the various piling operations.'],
					[45.5, ''],
					[49.8, 'Looking left you can see a plane taking off showing just how close we are working to the runway.'],
					[55, ' ']
				],
				Airport_02_2mbits:
				[				
								 	
					[13.8, 'You are now standing on precast concrete slabs which form the suspended deck.'],
					[20.0, 'In front and slightly to the left is the floating work platform, where the piling operation is being carried out.'],
					[27.3, 'The pile casing, a large steel tube, is driven down through the base of the dock into the clay. '],
					[34.7, 'The activity you can see now is the piling rig boring clay from within the steel casing.'],
					[41.7, 'Once complete this will be filled with concrete to form a concrete pile foundation to support the airport extension.'],
					[50, ' '],
					[64, 'Behind, you can see we have reinforced the precast slabs with steel bars, also known as Rebar.'],
					[71.5, 'Concrete will be poured over the reinforcement to form the final surface.'],
					[77, ' ']
					
				],
				Airport_03_2mbits:
				[				
									
					[3.5, 'You are standing on an area of suspended concrete deck, constructed by us.'],
					[10, 'You can see the crane on your left, is lifting a precast concrete section which has been delivered to site.'],
					[17, ' '],
					[21, 'These are manufactured off site in a factory environment,'],
					[24.8, 'where it’s easier to reproduce consistent shape segments.'],
					[30, 'This also helps reduce our traffic movements with concrete trucks in and around the local area.'],
					[37, 'These precast sections bridge the gap between the concrete pile foundations'],
					[41.7, 'and supports the installed slab members to form the deck.'],
					[49.2, 'The grey building behind you is the existing airport terminal building.'],
					[55, ' ']
					
				],
				Airport_04_2mbits:
				[
				
					[14.8, 'Looking straight ahead, is an area of the taxiway which has been concreted.'],
					[22.8, 'To the right, we can see an area where reinforcement steel has been fixed and will be concreted next.'],
					[31, 'To the left looking back to the existing terminal'],
					[34.2, 'you can appreciate how much of the deck has already been completed.'],
					[39, ' '],
					[42.7, 'To the right you can see the area we have constructed'],
					[45.7, 'using the concrete pile foundations and precast members.'],
					[50.2, ' '],
					[56.7, 'The final reinforcement steel is being fixed ready to be concreted.'],
					[62, ' ']
				
				],
				Airport_05_2mbits:
				[
				
					[3.3, 'Adjacent to the existing terminal building we are concreting a smaller section of the deck.'],
					[10, ' '],
					[15, 'The crane is being used in this instance to lift and pour concrete using a container called a skip.'],
					[23, 'The larger areas close to the runway will be concreted using a pump system.'],
					[28.5, 'Behind you, are several scaffold frames used to span the finished concrete areas'],
					[33.7, 'and protect the finish from the elements allowing the concrete to set and reach sufficient strength.'],
					[42, '']
				
				],
				Boston_01_2mbits:
				[
					[3.0, 'Below is the new Boston Barrier. The flood gate is installed and is locked in a maintenance position.'],
					[10, 'Looking left we have an excavator on a barge dredging the river in preparation for scour protection'],
					[17, 'which is downstream of the new barrier and river channel.'],
					[20.5, 'Looking right upstream, and behind us are views towards the town of Boston.'],
					[28, '']
				
					
				],
				Boston_02_2mbits:
				[
					[1, 'Between you and the river is one of the two twin wall cofferdams.'],
					[6.5, 'The two rows of steel sheet piles with earth infill enable the whole barrier installation and'],
					[12, 'concrete works to be carried out in a temporary dry dock.'],
					[16.5, 'Further left, you can see down into the newly constructed river channel and the second cofferdam beyond.'],
					[23.5, 'When the works are complete the cofferdams will be removed and'],
					[26.5, 'the gate will normally sit in the curved recess forming the riverbed.'],
					[31, 'The river will then permanently flow through the new concrete channel.'],
					[38, ' ']	
				],
				Boston_03_2mbits:
				[
					[6.8, 'We are down in the new river channel, ahead of us is the cofferdam'],
					[11, 'holding back both the river and tidal range of the sea.'],
					[14.3, 'Turn around and you can see another similar cofferdam on the upstream side.'],
					[21, 'To both right and left we have shuttering joiners working in Mobile Elevated Work Platforms.'],
					[27.5, 'They are installing the curved steel sealing plates.'],
					[31.5, 'These will be concreted in place to provide a tight seal along'],
					[35, 'each side of the barrier when it is raised in flood conditions.'],
					[40, 'Above, you can see the barrier, locked overhead while work progresses.'],
					[45.5, 'When deployed it will rise from the recess up to a vertical position to hold back tidal surges'],
					[52.3, 'and protect 100’s of homes and businesses in and around Boston.'],
					[58, ' ']	
				],
				HPC_01_2mbits:
				[
					[3, 'This is a bird’s eye view of Hinkley Point C construction site.'],
					[8, 'This view is captured from the top of a crane jib allowing you to see the expanse of the work.'],
					[15.8, 'Our involvement here is in a Joint Venture with Kier, another large UK contractor.'],
					[22, ' Our contract is to carry out excavation works, stabilisation of excavations and construct roads and services.'],
					[32.3, 'In front you can see the circular footprint of one of the nuclear islands where a reactor will eventually sit.'],
					[40.3, 'Behind, you can view across the site and out into the Bristol Channel.'],
					[47.8, 'At its peak we employed a workforce of over 2000 out on site'],
					[53, 'as well as 550 management and support staff in the office complex.'],
					[59, ' ']
						
				],
				HPC_02_2mbits:
				[
					[4.3, 'In front we can see is a lifting team carrying out a routine lift'],
					[8.3, 'using one of the many tower cranes on site, look up and you will see which one.'],
					[14, ' '],
					[17.3, 'Only specially qualified people can carry out lifting operations on our sites.'],
					[23.5, ' '],
					[40.8, 'Behind you is arguably the biggest land-based crane in the world, it is nicknamed ‘Big Carl’.'],
					[47.3, 'Big Carl is rated at 5000 tonnes which means it is capable of theoretically lifting'],
					[53.5, '5000 tonnes at minimum radius of 40m from its centre.'],
					[59.8, 'We use big cranes like this when we need to lift'],
					[62.5, 'very heavy items at some distance from the crane centre.'],
					[68, 'Big Carl can lift 2000 tonnes at a distance of 100 metres from its centre.'],
					[75, ' ']
						
				],
				HPC_03_2mbits:
				[
					[3.5, 'Another view of Big Carl straight ahead.'],
					[7, ' '],
					[18.5, 'The whole machine is designed to be transported to and from site by road transport.'],
					[27, 'It takes over 250 road movements to relocate the crane which is normally based in Belgium.'],
					[35, ' ']
					
						
				],
				HPC_04_2mbits:
				[
					[2, 'Here you can see an area of excavation we have completed.'],
					[8.7, 'The whole site comprises of different shaped and profiled excavations like this.'],
					[15.3, 'In total, we have excavated over 5 million cubic metres of material.'],
					[21, 'We secure the rock with ground anchors then'],
					[24, 'spray all the exposed surfaces with concrete to stabilise them for the duration of the work.'],
					[30.5, ' ']
					
						
				],
				HPC_05_2mbits:
				[
					[3.8, 'Most of the excavation is in rock which must be broken out using hydraulic breakers.'],
					[10.5, ' '],
					[13, 'Looking in either direction you can see the stabilised excavation faces that we have now installed.'],
					[19.5, ' ']
				
				],
				HPC_06_2mbits:
				[
					[2.5, 'Each excavation is treated with sprayed concrete to stabilise and make safe for the work which follows.'],
					[11.5, 'We dig down approximately 2m and then stabilise before further excavation proceeds.'],
					[19, ' '],
					[22.5, 'All concrete is batched on site to minimise traffic in the local area.'],
					[29, ' ']			
				],
				HPC_07_2mbits:
				[
					[3.5, 'Look ahead you can see the red jib of a concrete pump,'],
					[7, 'pumping concrete into the excavation to form one of the nuclear new build structures.'],
					[14.2, ' '],
					[16.2, 'Materials for concrete are delivered by boat travelling up the Bristol Channel and offloading at a purpose built jetty.'],
					[24.5, 'Concrete is batched and then transported in truck just the same as if brought in by road.'],
					[32, ' ']							
				],
				Tideway_01_2mbits:
				[
					[1, 'This is one of the access shafts on the Thames Tideway super sewer construction.'],
					[7, 'We are building a tunnel similar to those used for the London Underground,'],
					[11.5, 'but this tunnel will upgrade the aging Victorian London Sewer system.'],
					[15.7, 'Look above and you can see a set of tunnel segments being lowered from the surface'],
					[20.5, 'and being loaded onto the tunnel train.'],
					[24.5, ' '],
					[28.7, 'Bolted to the sides of the shaft you can see various pipes and cables to supply'],
					[33, 'power, water, and ventilation for the construction work.'],
					[38.5, ' ']
				
				],
				Tideway_02_2mbits:
				[
					[1.5, 'Looking right, towards the TBM or Tunnel Boring Machine'],
					[5, 'you can see the train returning from its delivery to the TBM.'],
					[10, 'Fixed to the sides of the tunnel are service pipes and ducts.'],
					[14.5, 'In front and below you can see a narrow-gauge railway and an elevated walkway for pedestrians,'],
					[21, 'this is how we transport materials to the Tunnel Boring Machine from the access shaft.'],
					[28, ' ']
				
				],
				Tideway_03_2mbits:
				[
					[10, 'You are now inside the TBM, with the boring head behind you.'],
					[14, ' '],
					[18.5, 'If you look down, a tunnel lining segment has just been fed through from the train'],
					[23.3, 'on a conveyor system and picked up by the hydraulic arm.'],
					[29.5, 'The arm will place the segment in its final position on your right to form a ring.'],
					[35, 'Once the ring is complete the TBM can advance to make room for the next ring.'],
					[42, ' '],
					[90, 'If you look right, the hydraulic rams hold the segments in place'],
					[95, 'and when the TBM enters boring mode the rams push the boring head forward.'],
					[103, 'Production is measured by the number of rings installed in a day or week.'],
					[108.3, 'Depending on conditions this TBM will achieve between 90 and 140 rings per week.'],
					[116, ' '],
				
				
				]
				
					
				
			}
		


	

    this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
  
	this.onPlay360Click = this.onPlay360Click.bind(this);
	this.on360VideoEnded = this.on360VideoEnded.bind(this);
	this.GoBackToMainMenu = this.GoBackToMainMenu.bind(this);
	this.playNextVideo = this.playNextVideo.bind(this);
	this.OnEnteredVRMode = this.OnEnteredVRMode.bind(this);
	this.OnExitVRMode = this.OnExitVRMode.bind(this);
	
	
	this.play360Button = document.querySelector('#play360Button');
	this.play360Button.addEventListener('click', this.onPlay360Click);
	//this.play360Button.setAttribute('material', 'src',Play360ButtonBackground);
	
	
	this.scene.addEventListener('enter-vr', this.OnEnteredVRMode);
	this.scene.addEventListener('exit-vr',this.OnExitVRMode);
	
	
	
	this._360VideoPlayer.addEventListener('materialvideoended', this.on360VideoEnded);
	
	this._360VideoPlayer.object3D.visible = true;
	this._360VideoPlayer.setAttribute('material', 'src', "#"+this.bamXrInfo['LondonCityAirportBTN']._360Img);
	
	this.playerMenuReturnToMainMenu.addEventListener('click', this.GoBackToMainMenu);
	this.playerMenuNextVideo.addEventListener('click', this.playNextVideo);

	
	this.keyFactPin = document.querySelector('#keyFactPin');
	this.keyFactCrane = document.querySelector('#keyFactCrane');
	this.keyFactStopWatch = document.querySelector('#keyFactStopWatch');
	this.keyFactMoney = document.querySelector('#keyFactPinMoney');
	
	for (var i = 0; i < buttonEls.length; ++i) {
      buttonEls[i].addEventListener('click', this.onMenuButtonClick);
    }
	
	
  // this.backgroundEl.addEventListener('click', this.onBackgroundClick);
   this.el.object3D.renderOrder = 9999999;
   
   this.el.object3D.depthTest = false;
    fadeBackgroundEl.object3D.renderOrder = 9;
    fadeBackgroundEl.getObject3D('mesh').material.depthTest = false;
	
	
  this.playerMenu.setAttribute('visible', false);
    this.playerMenuNextVideo.setAttribute('class', "");
	  this.playerMenuReturnToMainMenu.setAttribute('class', "");
	  
	  this.play360Button.setAttribute('visible', false);
	  
	  
	this.onDesktopMode();
	//this.onVRMode();
	
	if(AFRAME.utils.device.isMobile() === true) {
		
		console.log("is moblie");
		
	}
	
	
	
	this.ShowSubsBTN = document.querySelector('#SubtitlesOnOffBtn');
	this.setSubtitlesOnOff = this.setSubtitlesOnOff.bind(this);
	this.ShowSubsBTN.addEventListener('click', this.setSubtitlesOnOff);
	this.ShowSubtitles = true;
	
	
	
	
	
  },

  onMenuButtonClick: function (evt) {
	  
	 this.welcomePanel.object3D.visible = false;
	 this.play360Button.setAttribute('visible', true);
	 
		this.play360Button.setAttribute('class', "raycastable");
	  
    var movieInfo = this.bamXrInfo[evt.currentTarget.id];
	
	this.currentSection = movieInfo;
	this.currentSectionVideoIndex = 0;
	
	console.log(evt.currentTarget.id);

    //this.backgroundEl.object3D.scale.set(1, 1, 1);

    this.el.object3D.scale.set(1, 1, 1);
	
	console.log("force updated");
	
    //if (AFRAME.utils.device.isMobile()) { this.el.object3D.scale.set(1.4, 1.4, 1.4); }
    this.el.object3D.visible = true;
  //  this.fadeBackgroundEl.object3D.visible = true;

   if (this.movieImageEl) { this.movieImageEl.object3D.visible = false; }
    this.movieImageEl = movieInfo.imgEl;
    this.movieImageEl.object3D.visible = true;
	this.movieImageEl.setAttribute('material', 'src', movieInfo.bannerImg);

    this.movieTitleEl.setAttribute('text', 'value', movieInfo.title);
    this.movieDescriptionEl.setAttribute('text', 'value', movieInfo.description);
	console.log(movieInfo.keyFacts[0]);
	this.keyFactPin.setAttribute('text', 'value', movieInfo.keyFacts[0]);
	this.keyFactCrane.setAttribute('text', 'value', movieInfo.keyFacts[1]);
	this.keyFactStopWatch.setAttribute('text', 'value', movieInfo.keyFacts[2]);
	this.keyFactMoney.setAttribute('text', 'value', movieInfo.keyFacts[3]);
	
	this._360VideoPlayer.setAttribute('material', 'src', "#"+movieInfo._360Img);
	
	
  },

  
  onDesktopMode: function()
  {
	  console.log("desktop mode");
	  
	  	 var mouse_c = document.querySelector('#cursor_mouse');
	 
	 mouse_c.setAttribute('raycaster', 'enabled', true);
	  
	  var cursor_gaze = document.querySelector('#cursor');
	 
	   cursor_gaze.setAttribute('raycaster', 'enabled', false);
	  cursor_gaze.object3D.visible = false;
	  
	
	
	  
	/*
	 this.camRig.object3D.position.set(
					0,
					0,
					0,
				); 
		*/		
				
		var worldShift = document.querySelector("#worldShift");
		
		
		worldShift.object3D.position.set(
					0,
					0,
					0,
				); 
		
				
			
				
		
	  
  },
    onVRMode: function()
  {
	  console.log("vr mode mode");
	  
	 var mouse_c = document.querySelector('#cursor_mouse');
	 
	 mouse_c.setAttribute('raycaster', 'enabled', false);
	  
	  var cursor_gaze = document.querySelector('#cursor');
	 
	   cursor_gaze.setAttribute('raycaster', 'enabled', true);
	  cursor_gaze.object3D.visible = true;
	  
	
	this.cursor.object3D.visible = true;
	
	/*
	  
	 this.camRig.object3D.position.set(
					0,
					1.6,
					0,
				); 
	
*/


	var worldShift = document.querySelector("#worldShift");
	
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

		
		 // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        
		console.log("ios");
    }
	else
	{
		
		if(/Quest|Quest 2/.test(userAgent))
		{
			console.log("quest");
		}
		else
		{
				worldShift.object3D.position.set(
					0,
					worldShift.object3D.position.y -1.6,
					0,
				); 
		}
			
	
	}
		
		
		
				
				
	

			
  },
  
  onPlay360Click: function(evt){
	  
	  console.log("Play 360 pressed");
	  this._360VideoPlayer.object3D.visible = true;
	    
	  this.playerMenu.setAttribute('visible', true);
	  this.playerMenuNextVideo.setAttribute('class', "raycastable");
	  this.playerMenuReturnToMainMenu.setAttribute('class', "raycastable");
	  
	  this.ShowSubsBTN.setAttribute('class', "");
	  
	
	  console.log(this.currentSection.vidSrc[this.currentSectionVideoIndex]);
	 
		
		this.playCurrentVideo();
	  
	  this.fadeBackgroundEl.object3D.visible = false;
	  
	  
	  
	  this.UIMenu.setAttribute('visible',false);
	  this.UIMenu.object3D.scale.set(0.001, 0.001, 0.001);
	  this.InfoPanel.object3D.visible = false;
	     this.el.object3D.scale.set(0.001, 0.001, 0.001);
		 
	
	
	  
  },
  
  on360VideoEnded: function(evt) {
	  
	  console.log("video ended?");
	  
	  if(this.currentSectionVideoIndex < this.currentSection.vidSrc.length - 1)
	  {
		  //this.currentSectionVideoIndex ++;
		  
		  
		// this.playCurrentVideo();
		this.playNextVideo();
		
		  
	  }
	  else
	  {
		 
		  
		  this.GoBackToMainMenu();
		  
	  }
		  
	  
	  
	  
  },
  
  playCurrentVideo: function()
  {
	  console.log("Play current video");
	  
	  if(this.currentSectionVideoIndex == this.currentSection.vidSrc.length - 1)
	  {
		this.playerMenuNextVideo.setAttribute('visible', false);
		this.playerMenuNextVideo.setAttribute('class', "");
		
		this.playerMenuReturnToMainMenu.object3D.position.set(
					0,
					this.playerMenuReturnToMainMenu.object3D.position.y,
					this.playerMenuReturnToMainMenu.object3D.position.z,
				); 
	  }
	  
	   var id = this.currentSection.vidSrc[this.currentSectionVideoIndex];
	   var src = this.currentSection.vidSrcPath + id;
	   
	   if(this.IsIOS())
	   {
			src = src + ".mp4";
	   }
	   else
	   {
		   src = src + ".mp4"; // might wanna do webms  for roid
	   }
	   
	
		var videoID = '?dummy=' + Date.now();
		
	
		var video = document.createElement("VIDEO");
		console.log(escape(src + videoID));
		video.setAttribute('src', (src + videoID));
		video.id = videoID;
		video.setAttribute('webkit-playsinline', ' ');
		video.setAttribute('playsinline', ' ');
		//video.crossOrigin = 'anonymous';
		video.crossOrigin = 'anonymous';
	//	video.setAttribute('autoplay', 'autoplay');
		video.width = 2048;
		video.height= 1024; 
		video.preload = 'auto';
		video.style.display = 'none';
		//video.type = 'video/mp4';
		
		console.log(video.src);
	  document.body.appendChild(video);

		
	
	//this._360VideoPlayer.object3D.visible = false;
	 
		this._360VideoPlayer.setAttribute('material','src', '#'+videoID);
	 
		// var video = document.querySelector("#"+id);
		
		
		
		//window.stop();
		
		// video.currentTime = 0;
		//video.load();
		  var playPromise = video.play();

  if (playPromise !== undefined) {
    playPromise.then(_ => {
      // Automatic playback started!
	  
	   
	  console.log("Playing?");

    })
    .catch(error => {
      // Auto-play was prevented
      
	  console.log(error);
	  
    });
  }
		//video.muted = false;
		
		this.CurrentVideoPlaying = video;
		
	//	this._360VideoPlayer.object3D.visible = true;

	
  },
			
		  
  
  
  
  setSubtitles: function(sub)
  {

	
	this.SubtitleText.setAttribute('text', 'value', sub);
	
	  
	  
  },
  
  setSubtitlesOnOff: function()
  {
	  if(this.ShowSubtitles)
	  {
		    this.ShowSubtitles = false;
			 this.SubtitlesText.setAttribute('visible', false);
			this.ShowSubsBTN.setAttribute('text', 'value', 'Subtitles: Off');
	  }
	  else
	  {
		   // this.SubtitlesText.setAttribute('visible', true);
		   this.ShowSubsBTN.setAttribute('text', 'value', 'Subtitles: On');
		   this.ShowSubtitles = true;
	  }
	
  },
  
  playNextVideo: function()
  {
	  if(this.CurrentVideoPlaying.readyState != 4)
	  {
		  return;
	  }
	  
	  
	  if(this.CurrentVideoPlaying.currentTime < 3)
	  {
		  console.log("Can't skip yet");
		  return;
	  }
	  
	  console.log("Play next video");
	  
	  this.SubtitlesText.setAttribute('text', 'value', ' ');
	  
	  this.stopCurrentVideo();
	  
	  this.currentSectionVideoIndex ++;
	  
	  this.playCurrentVideo();
	 
		  
  },
  
   stopCurrentVideo: function()
  {
	  console.log("Stop current video");
	  
	  //this.CurrentVideoPlaying.setAttribute('src', '');
	  
	 // this.CurrentVideoPlaying.load();
	  
	  // var id = this.currentSection.vidSrc[this.currentSectionVideoIndex];
	
	 
		//	this._360VideoPlayer.setAttribute('material','src', "#"+id);
	 
		//	var video = document.querySelector("#"+id);
			
	//		video.pause();
	
	
	 
	
	
	this.CurrentVideoPlaying.pause();
//	this.CurrentVideoPlaying.src = "";
//	this.CurrentVideoPlaying.load();
//	
	if(this.CurrentVideoPlaying !== null && typeof this.CurrentVideoPlaying !== 'undefined')
	{
		
		this.CurrentVideoPlaying.parentElement.removeChild(this.CurrentVideoPlaying);
		
		
		
		//var oldVideSRC = this.CurrentVideoPlaying.getAttribute('src');
		
	//	console.log(oldVideSRC);
		
		this.CurrentVideoPlaying.setAttribute('src', '');
	this.CurrentVideoPlaying.load();

	////=	this.CurrentVideoPlaying.src =  oldVideSRC; //.split; // + '?dummy=' + Date.now();
		//	this.CurrentVideoPlaying.currentTime = 0;
	//	this.CurrentVideoPlaying.load();
	
		
	
	}
	
	
		  
  },
  
  
  GoBackToMainMenu: function()
  {
	//  window.stop();
	  this.playerMenu.setAttribute('visible', false);
	  this.playerMenuNextVideo.setAttribute('visible', true); // add this back in 
	  
	  this.playerMenuNextVideo.setAttribute('class', "");
	  this.playerMenuReturnToMainMenu.setAttribute('class', "");
 	  
	  this.stopCurrentVideo();
	  
	   this.currentSectionVideoIndex = 0;
	   
	  this.VideoIsPlaying = false;
	  
	  	  this.ShowSubsBTN.setAttribute('class', "raycastable");
	  
	    //this._360VideoPlayer.object3D.visible = false;
		
		this._360VideoPlayer.setAttribute('material', 'src', "#"+this.bamXrInfo['LondonCityAirportBTN']._360Img);
	
		this.play360Button.setAttribute('visible', false);
		this.play360Button.setAttribute('class', "");
		 
		this.InfoPanel.object3D.visible = true;
		this.welcomePanel.object3D.visible = true;
		  
		this.UIMenu.setAttribute('visible',true);
		 this.UIMenu.object3D.scale.set(1, 1, 1);
		  
		 this.el.object3D.scale.set(1, 1, 1);
	  
		var camRotY =  this.Cam.object3D.rotation.y;
		
			this.playerMenuReturnToMainMenu.object3D.position.set(
					-0.35,
					this.playerMenuReturnToMainMenu.object3D.position.y,
					this.playerMenuReturnToMainMenu.object3D.position.z,
				); 
	  
	  
		//console.log(camRotY);
	 
		this.SubtitlesText.setAttribute('text', 'value', ' ');
	  
	  
	  
	  this.wrapScene.object3D.rotation.set(
					0,
					camRotY,
					0,
				);
	
	
	  
  },
  
  OnEnteredVRMode: function()
  {
	  
	this.onVRMode();
  },
  
  OnExitVRMode: function()
  {
	  
	  this.onDesktopMode();
  },
  
  tick: function (time, timeDelta) {
  
	// called every frame 
  
	//console.log("ticking...?");
	
//	console.log(THREE.Clock.getDelta);
	
	this.playerMenu.object3D.rotation.set(
					0,
					this.ease(),
					0,
				);
				
	this.playerMenuReturnToMainMenu.object3D.lookAt(this.Cam.object3D.position);
	this.playerMenuNextVideo.object3D.lookAt(this.Cam.object3D.position);
	this.SubtitlesText.object3D.lookAt(this.Cam.object3D.position);
	
	if(this.CheckIfPlayingVideo())
	{
		//console.log("Is playing...!");
		
		var SubtitlesBlock = this.Subtitles[this.CurrentVideoPlaying.id];
		
		if(SubtitlesBlock === null || typeof SubtitlesBlock === 'undefined')
			return;
		
		var playTime = this.CurrentVideoPlaying.currentTime;
		
		for (var i = 0; i < SubtitlesBlock.length; ++i) {
			
			if(Math.abs(playTime -  SubtitlesBlock[i][0]) > 0.1 && Math.abs(playTime -  SubtitlesBlock[i][0]) < 0.3 )
			{
				
				
				    this.SubtitlesText.setAttribute('text', 'value', SubtitlesBlock[i][1]);
					//console.log(SubtitlesBlock[i][1]);
				
				
					if(this.ShowSubtitles)
					{
						this.SubtitlesText.setAttribute('visible', true);
					}
				
				
			}
			
		}
		
				
		
		
	}
	

	
  },
  
  CheckIfPlayingVideo: function()
  {
	
	if(this.CurrentVideoPlaying !== null && typeof this.CurrentVideoPlaying !== 'undefined')
	{
		if(this.CurrentVideoPlaying.currentTime > 0 && 
		!this.CurrentVideoPlaying.paused &&
		!this.CurrentVideoPlaying.ended && 
		this.CurrentVideoPlaying.readyState > 2)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	else
	{
		return false;
	}		
	 
	
	
  },
  
  IsIOS: function()
  {
		
		
	var userAgent = navigator.userAgent || navigator.vendor || window.opera;

		
		 // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        
		console.log("ios");
		return true;
    }
	else
	{
		return false;
	}
	
	
	
  },
  
  ease: function () { 
  
  //console.log(Math.abs(this.playerMenu.object3D.rotation.y - this.Cam.object3D.rotation.y));
  
  if(Math.abs(this.playerMenu.object3D.rotation.y - this.Cam.object3D.rotation.y) > 0.4)
  {
	 return THREE.MathUtils.damp(this.playerMenu.object3D.rotation.y, this.Cam.object3D.rotation.y, 1, 0.01);
	
  
  }
  else
  {
	 return this.playerMenu.object3D.rotation.y;
	
	// return THREE.MathUtils.damp(this.playerMenu.object3D.rotation.y, this.Cam.object3D.rotation.y, 0.1, 0.01);
	
  }
   
  
  }
  
});




 