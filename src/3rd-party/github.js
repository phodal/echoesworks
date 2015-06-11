function rawGitConvert(url){
	var results = url.replace('github.com', 'rawgit.com');
	results = results.replace('raw.githubusercontent.com', 'rawgit.com');
	return results;
}

var Github = {
	convertURL: rawGitConvert
};

EchoesWorks.prototype = EchoesWorks.extend(EchoesWorks.prototype, {fn: Github});