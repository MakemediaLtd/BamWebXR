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
	this.closeButton = document.querySelector('#closeButton');
	
	this.Cam = document.querySelector('#cam');
	this.wrapScene = document.querySelector('#wrapScene');
	
	this.playerMenu = document.querySelector('#PlayerMenu');
	this.playerMenuNextVideo = document.querySelector('#PlayerMenuNextVideo');
	this.playerMenuReturnToMainMenu = document.querySelector('#PlayerMenuReturnToMainMenu');
	
	
	var PanelBackground  = 'UI/PanelBackground.png';
	var Play360ButtonBackground = 'UI/PlayButtonBackground.png';
	
	this.welcomePanel = document.querySelector('#welcomePanel');
	
	this.welcomePanel.setAttribute('material', 'src', PanelBackground);
	
	this.InfoPanel.setAttribute('material', 'src', PanelBackground);
	
	this.scene = document.querySelector('a-scene');
	
	
	// Need to set RAY ORIGIN to enity if we are in VR
	
	this.bamXrInfo = {
		LondonCityAirportBTN:{
			title:'London City Airport',
			description: 'BAM Nuttall and BAM International have jointly been awarded a contract for £85m to construct a 75,000m² concrete deck extension providing a new taxiway and additional aircraft parking.  The project is part of a £480m development programme for the airport and involves over 1000 steel cased concrete piles, installation of over 6000 precast sections and pouring over 43,500m³ of concrete.',
			vidSrc: 
			[
				'Airport_01_2mbits',
				'Airport_02_2mbits',
				'Airport_03_2mbits',
				'Airport_04_2mbits',
				'Airport_05_2mbits'
				
			],
			bannerImg: 'ProjectImages/London-City-Airport-2.jpg',
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
				'Tideway_01_2mbits',
				'Tideway_02_2mbits',
				'Tideway_03_2mbits'
			],
			bannerImg: 'ProjectImages/TTW.jpg',
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
				'HPC_01_2mbits',
				'HPC_02_2mbits',
				'HPC_03_2mbits',
				'HPC_04_2mbits',
				'HPC_05_2mbits',
				'HPC_06_2mbits',
				'HPC_07_2mbits'
			],
			bannerImg: 'ProjectImages/hinkley_point.jpg',
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
				'Boston_01_2mbits',
				//'output'
				//'output',
				'Boston_02_2mbits',
				'Boston_03_2mbits'
			],
			bannerImg: 'ProjectImages/Boston Barrier.jpg',
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

    this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
	this.onPlay360Click = this.onPlay360Click.bind(this);
	this.on360VideoEnded = this.on360VideoEnded.bind(this);
	this.GoBackToMainMenu = this.GoBackToMainMenu.bind(this);
	this.playNextVideo = this.playNextVideo.bind(this);
	this.OnEnteredVRMode = this.OnEnteredVRMode.bind(this);
	this.OnExitVRMode = this.OnExitVRMode.bind(this);
	
	
	this.play360Button = document.querySelector('#play360Button');
	this.play360Button.addEventListener('click', this.onPlay360Click);
	this.play360Button.setAttribute('material', 'src',Play360ButtonBackground);
	
	
	this.scene.addEventListener('enter-vr', this.OnEnteredVRMode);
	this.scene.addEventListener('exit-vr',this.OnExitVRMode);
	
	this.closeButton.addEventListener('click', this.onCloseClick);
	
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
	
  },

  onMenuButtonClick: function (evt) {
	  
	 this.welcomePanel.object3D.visible = false;
	 this.play360Button.setAttribute('visible', true);
	  
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


// change this to a 'close' button?

  onCloseClick: function (evt) {
   // this.backgroundEl.object3D.scale.set(0.001, 0.001, 0.001);
    this.el.object3D.scale.set(0.001, 0.001, 0.001);
    this.el.object3D.visible = false;
    this.fadeBackgroundEl.object3D.visible = false;
	
  },
  
  onDesktopMode: function()
  {
	  console.log("desktop mode");
	  var cursor = document.querySelector('#cursor');
	  cursor.setAttribute('cursor', 'rayOrigin', 'mouse');
	  cursor.setAttribute('cursor','fuse', 'false');
	  cursor.object3D.visible = false;
	//	cursor="rayOrigin: entity; fuse: true; fuseTimeout: 600"	
	
	 var camRig = document.querySelector('#camRigHelper');
	  
	 camRig.object3D.position.set(
					0,
					0,
					0,
				); 
	  
  },
    onVRMode: function()
  {
	  console.log("vr mode mode");
	  var cursor = document.querySelector('#cursor');
	  cursor.setAttribute('cursor', 'rayOrigin', 'entity');
	  cursor.setAttribute('cursor','fuse', 'true');
	  cursor.object3D.visible = true;
	  
	  var camRig = document.querySelector('#camRigHelper');
	  
	 camRig.object3D.position.set(
					0,
					1.6,
					0,
				); 
  },
  
  onPlay360Click: function(evt){
	  
	  console.log("Play 360 pressed");
	  this._360VideoPlayer.object3D.visible = true;
	    
	  this.playerMenu.setAttribute('visible', true);
	  this.playerMenuNextVideo.setAttribute('class', "raycastable");
	  this.playerMenuReturnToMainMenu.setAttribute('class', "raycastable");
	  
	
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
		  this.currentSectionVideoIndex ++;
		  
		  
		 this.playCurrentVideo();
		  
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
					0.155,
					this.playerMenuReturnToMainMenu.object3D.position.y,
					this.playerMenuReturnToMainMenu.object3D.position.z,
				); 
	  }
	  
	   var id = this.currentSection.vidSrc[this.currentSectionVideoIndex];
	
	 
			this._360VideoPlayer.setAttribute('material','src', "#"+id);
	 
			var video = document.querySelector("#"+id);
			
			video.currentTime = 0;
			video.play();
			
		  
  },
  
  playNextVideo: function()
  {
	  console.log("Play next video");
	  
	  this.stopCurrentVideo();
	  
	  this.currentSectionVideoIndex ++;
	  
	  this.playCurrentVideo();
	 
		  
  },
  
   stopCurrentVideo: function()
  {
	  console.log("Stop current video");
	  
	   var id = this.currentSection.vidSrc[this.currentSectionVideoIndex];
	
	 
			this._360VideoPlayer.setAttribute('material','src', "#"+id);
	 
			var video = document.querySelector("#"+id);
			
			video.pause();
		  
  },
  
  
  GoBackToMainMenu: function()
  {
	  
	  this.playerMenu.setAttribute('visible', false);
	  this.playerMenuNextVideo.setAttribute('visible', true); // add this back in 
	  
	  this.playerMenuNextVideo.setAttribute('class', "");
	  this.playerMenuReturnToMainMenu.setAttribute('class', "");
 	  
	  this.stopCurrentVideo();
	  
	   this.currentSectionVideoIndex = 0;
	   
	  
	    //this._360VideoPlayer.object3D.visible = false;
		
		this._360VideoPlayer.setAttribute('material', 'src', "#"+this.bamXrInfo['LondonCityAirportBTN']._360Img);
	
		
		this.InfoPanel.object3D.visible = true;
		this.welcomePanel.object3D.visible = true;
		  
		this.UIMenu.setAttribute('visible',true);
		  this.UIMenu.object3D.scale.set(1, 1, 1);
	  
		var camRotY =  this.Cam.object3D.rotation.y;
		
			this.playerMenuReturnToMainMenu.object3D.position.set(
					0,
					this.playerMenuReturnToMainMenu.object3D.position.y,
					this.playerMenuReturnToMainMenu.object3D.position.z,
				); 
	  
	  
		//console.log(camRotY);
	 

	  
	  
	  
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
	
	
	var camRotY =  this.Cam.object3D.rotation.y;
	this.playerMenu.object3D.rotation.set(
					0,
					camRotY,
					0,
				);
	
	
  }
  
});




 