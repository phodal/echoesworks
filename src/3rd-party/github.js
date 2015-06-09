function rawGitConvert(url){
	return url.replace('github.com', 'rawgit.com');
}

var Github = {
	convertURL: rawGitConvert
};

EchoesWorks.prototype = EchoesWorks.extend(EchoesWorks.prototype, {fn: Github});